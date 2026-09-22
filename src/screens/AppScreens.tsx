import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import {
    Button,
    Card,
    Text,
    Surface,
    Title,
} from 'react-native-paper';

import { COLORS } from '../theme/colors';

export type DashboardScreenProps = {
    user: any;
    email: string;
    image?: string;
    onLogout: () => void;
};

type LoginScreenProps = {
    loading: boolean;
    onLogin: () => void;
};

export function LoginScreen({ loading, onLogin }: LoginScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Image
                source={require('../../assets/fondo.webp')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <View style={styles.loginContainer}>
                <Surface style={styles.logoCard} elevation={0}>
                    <View style={styles.brandRow}>
                        <Image
                            source={require('../../assets/logoApp.webp')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />

                        <View style={styles.brandTextWrap}>
                            <Text style={styles.title1}>CARDIO</Text>
                            <Text style={styles.title2}>SANO</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
                </Surface>

                <Button
                    mode="contained"
                    loading={loading}
                    onPress={onLogin}
                    disabled={loading}
                    style={styles.googleButton}
                    contentStyle={styles.googleButtonContent}
                    labelStyle={styles.googleButtonLabel}
                    icon={() => (
                        <Image
                            source={require('../../assets/google.webp')}
                            style={styles.googleIcon}
                            resizeMode="contain"
                        />
                    )}
                >
                    {loading ? 'Abriendo Google...' : 'Continuar con Google'}
                </Button>
            </View>
        </SafeAreaView>
    );
}

export function LoadingScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.loadingContainer}>
                <Title style={styles.title}>CardioSano</Title>
                <Text style={styles.subtitle}>Cargando...</Text>
            </View>
        </SafeAreaView>
    );
}

type ErrorScreenProps = {
    message: string;
    onRetry: () => void;
};

export function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.loadingContainer}>
                <Title style={styles.title}>CardioSano</Title>
                <Text style={styles.subtitle}>Error al iniciar</Text>
                <Text style={styles.errorText}>{message}</Text>
                <Button mode="contained" onPress={onRetry} style={styles.primaryButton}>
                    Reintentar
                </Button>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    loginContainer: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'rgba(0,0,0,0.70)',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    logoCard: {

        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 30,
        alignItems: 'center',
        width: '100%',
        borderWidth: 0,
        borderColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        marginBottom: 24,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 12,
    },
    logoImage: {
        width: 88,
        height: 88,
    },
    brandTextWrap: {
        justifyContent: 'center',
        lineHeight: 10,
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
    },
    brandLine: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: 0.5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#eef6ff',
        gap: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primaryDark,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: COLORS.white,
        textAlign: 'center',
    },
    errorText: {
        marginTop: 12,
        marginBottom: 20,
        color: '#b42318',
        textAlign: 'center',

    },
    primaryButton: {
        width: '100%',
        borderRadius: 16,
    },
    googleButton: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: COLORS.purple,
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,

    },
    googleButtonContent: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    googleButtonLabel: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
    googleIcon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    dashboardContainer: {
        gap: 16,
        paddingHorizontal: 8,
    },
    heroCard: {
        backgroundColor: '#1d4ed8',
        borderRadius: 20,
        overflow: 'hidden',
    },
    heroBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#dbeafe',
        color: '#1e3a8a',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 12,
        fontWeight: '700',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    heroText: {
        fontSize: 15,
        color: '#dbeafe',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#dfe7f5',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#14213d',
    },
    summaryText: {
        fontSize: 15,
        color: '#475569',
        marginTop: 8,
    },
    quickActions: {
        gap: 12,
    },
    logoutButton: {
        marginTop: 12,
        borderRadius: 14,
    },
    title1: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.accent,
    },
    title2: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.violet,
    },
});
