import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import type { CloudSyncResult, PatientRecord } from '../types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function syncPatientsToCloud(patients: PatientRecord[]): Promise<CloudSyncResult> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_ANON_KEY');
  }

  const payload = patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    status: patient.status,
    created_at: patient.created_at,
    updated_at: patient.updated_at,
    synced_at: patient.synced_at,
  }));

  const { error } = await supabase.from('patients').upsert(payload, {
    onConflict: 'id',
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    synced: payload.length,
    total: payload.length,
  };
}
