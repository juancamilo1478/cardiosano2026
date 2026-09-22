import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { Alert, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { getSession, signInWithGoogle, signOut } from './src/lib/auth';
import { supabase } from './src/lib/supabase';
import { ErrorScreen, LoadingScreen, LoginScreen } from './src/screens/AppScreens';
import { DashboardScreen } from './src/screens/DashboardScreens';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootError, setBootError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setBootError(null);
      const result = await signInWithGoogle();
      if (result.session) {
        setSession(result.session);
        setBooting(false);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo iniciar sesión con Google.';
      Alert.alert('Error con Google', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
      }
    });

    const applySessionFromDeepLink = async (nextUrl?: string | null) => {
      if (!nextUrl || !nextUrl.includes('cardiosano://auth/callback')) {
        return;
      }

      const { session: currentSession, error } = await getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        setBootError(error.message);
        return;
      }

      setSession(currentSession);
    };

    const handleInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log('Initial URL on app start:', initialUrl);
        if (mounted) {
          await applySessionFromDeepLink(initialUrl ?? undefined);
        }

        const { session: currentSession } = await getSession();
        if (mounted) {
          setSession(currentSession);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudo inicializar la app.';
        if (mounted) {
          setBootError(message);
        }
      } finally {
        if (mounted) {
          setBooting(false);
        }
      }
    };

    const urlSubscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
      void applySessionFromDeepLink(url);
    });

    void handleInitialUrl();

    return () => {
      mounted = false;
      urlSubscription.remove();
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    setSession(null);
  };

  if (!session) {
    return <LoginScreen loading={loading} onLogin={handleGoogleLogin} />;
  }

  if (booting) {
    return <LoadingScreen />;
  }

  if (bootError) {
    return (
      <ErrorScreen
        message={bootError}
        onRetry={() => {
          setBootError(null);
          setBooting(true);
          void getSession().then(({ session: currentSession, error }) => {
            if (error) {
              setBootError(error.message);
              setBooting(false);
              return;
            }
            setSession(currentSession);
            setBooting(false);
          });
        }}
      />
    );
  }

  const renderScreen = () => {
    const user = session?.user;
    const image =
      user?.user_metadata?.avatar_url ??
      user?.user_metadata?.picture ??
      user?.image ??
      undefined;

    console.log('Session user metadata:', user?.user_metadata);
    console.log('Session image candidates:', {
      image: user?.image,
      avatar_url: user?.user_metadata?.avatar_url,
      picture: user?.user_metadata?.picture,
    });

    return (
      <DashboardScreen
        image={image}
        email={user?.email ?? ''}
        user={user}
        onLogout={handleSignOut}
      />
    );
  };

  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {renderScreen()}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef6ff',
  },
  container: {
    flex: 1,
    gap: 20,
  },
  appBar: {
    backgroundColor: '#1d4ed8',
    borderRadius: 18,
    marginBottom: 8,
  },
  bottomNav: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tabButton: {
    borderRadius: 12,
  },

});
