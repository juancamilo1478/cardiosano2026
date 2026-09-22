import AsyncStorage from '@react-native-async-storage/async-storage';

import type { PatientRecord, PatientStatus } from '../types';

const STORAGE_KEY = 'cardiosano.patients';

async function readStorage(): Promise<PatientRecord[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as PatientRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeStorage(rows: PatientRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export async function initDatabase() {
  await readStorage();
}

export async function loadPatients(): Promise<PatientRecord[]> {
  return readStorage();
}

export async function addPatient(name: string, age: number, status: PatientStatus) {
  const now = new Date().toISOString();
  const rows = await readStorage();
  const nextId = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;

  const patient: PatientRecord = {
    id: nextId,
    name: name.trim(),
    age,
    status,
    created_at: now,
    updated_at: now,
    synced_at: null,
  };

  await writeStorage([patient, ...rows]);
}

export async function updatePatientStatus(id: number, nextStatus: PatientStatus) {
  const rows = await readStorage();
  const updated = rows.map((row) =>
    row.id === id
      ? { ...row, status: nextStatus, updated_at: new Date().toISOString(), synced_at: null }
      : row
  );

  await writeStorage(updated);
}

export async function getUnsyncedPatients(): Promise<PatientRecord[]> {
  const rows = await readStorage();
  return rows.filter((row) => row.synced_at === null);
}

export async function markPatientsAsSynced(ids: number[]) {
  if (ids.length === 0) {
    return;
  }

  const rows = await readStorage();
  const now = new Date().toISOString();
  const updated = rows.map((row) =>
    ids.includes(row.id) ? { ...row, synced_at: now } : row
  );

  await writeStorage(updated);
}

export async function deletePatient(id: number) {
  const rows = await readStorage();
  await writeStorage(rows.filter((row) => row.id !== id));
}
