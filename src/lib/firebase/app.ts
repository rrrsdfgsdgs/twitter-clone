import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isUsingEmulator } from '@lib/env';
import { getFirebaseConfig } from './config';
import type { Auth } from 'firebase/auth';
import type { Functions } from 'firebase/functions';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { FirebaseStorage } from 'firebase/storage';
import type { FirebaseOptions } from 'firebase/app';

type Firebase = {
  auth: Auth;
  storage: FirebaseStorage;
  firestore: Firestore;
  functions: Functions;
  firebaseApp: FirebaseApp;
};

function sanitizeConfig(config: any): FirebaseOptions {
  // Ensure all fields are strings (fallback to empty string if missing)
  return {
    apiKey: String(config.apiKey ?? ""),
    authDomain: String(config.authDomain ?? ""),
    projectId: String(config.projectId ?? ""),
    storageBucket: String(config.storageBucket ?? ""),
    messagingSenderId: String(config.messagingSenderId ?? ""),
    appId: String(config.appId ?? ""),
    measurementId: String(config.measurementId ?? "")
  };
}

function initialize(): Firebase {
  const firebaseApp = initializeApp(sanitizeConfig(getFirebaseConfig()));

  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const functions = getFunctions(firebaseApp);

  return { firebaseApp, auth, firestore, storage, functions };
}

function connectToEmulator({
  auth,
  storage,
  firestore,
  functions,
  firebaseApp
}: Firebase): Firebase {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);

  return { firebaseApp, auth, firestore, storage, functions };
}

export function getFirebase(): Firebase {
  const firebase = initialize();

  if (isUsingEmulator) return connectToEmulator(firebase);

  return firebase;
}

export const { firestore: db, auth, storage } = getFirebase();
