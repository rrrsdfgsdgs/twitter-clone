const config = {
  apiKey: process.env.AIzaSyD_hz1uDLweZyF2vdH5_XIjH5AE3MheO80,
  authDomain: process.env.hhhmhvn.firebaseapp.com,
  projectId: process.env.hhhmhvn,
  storageBucket: process.env.hhhmhvn.firebasestorage.app,
  messagingSenderId: process.env.699200122926,
  appId: process.env.1:699200122926:web:920be98a6cd547999f6fbf,
  measurementId: process.env.G-XBWRH9KKG7
} as const;

type Config = typeof config;

export function getFirebaseConfig(): Config {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');

  return config;
}
