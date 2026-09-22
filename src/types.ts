export type PatientStatus = 'activo' | 'en revisión' | 'bajo observación';

export interface PatientRecord {
  id: number;
  name: string;
  age: number;
  status: PatientStatus;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
}

export interface CloudSyncResult {
  synced: number;
  total: number;
}
