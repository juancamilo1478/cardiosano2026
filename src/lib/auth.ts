import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

function getSessionFromCallbackUrl(url: string) {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) {
    return null;
  }

  const hash = url.slice(hashIndex + 1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}

export async function signInWithGoogle() {
  const redirectTo =
    Platform.OS === 'web'
      ? 'http://localhost:8081'
      : 'cardiosano://auth/callback';

  console.log('Google auth redirectTo:', redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.log('Google auth error:', error);
    throw error;
  }

  if (!data.url) {
    throw new Error('No se pudo generar la URL de autenticación con Google.');
  }

  console.log('Google auth URL:', data.url);

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  console.log('Google auth result:', result);

  if (result.type === 'cancel') {
    throw new Error('Cancelaste el inicio de sesión con Google.');
  }

  if (result.type === 'dismiss') {
    throw new Error('Se cerró la sesión de autenticación de Google.');
  }

  if (result.type !== 'success') {
    throw new Error('No se pudo abrir la autenticación con Google.');
  }

  const callbackSession = getSessionFromCallbackUrl(result.url ?? '');
  if (callbackSession) {
    const { data: setSessionData, error: setSessionError } = await supabase.auth.setSession(callbackSession);

    if (setSessionError) {
      console.log('Google setSession error:', setSessionError);
      throw setSessionError;
    }

    if (setSessionData.session) {
      return setSessionData;
    }
  }

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.log('Google session error:', sessionError);
      throw sessionError;
    }

    console.log(`Intento de sesión ${attempt + 1}:`, !!sessionData.session);

    if (sessionData.session) {
      return sessionData;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  console.log('Sin sesión tras OAuth.');
  return { session: null, user: null };
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { session, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
