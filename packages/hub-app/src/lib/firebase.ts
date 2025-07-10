// Firebase client-side initialization
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4cRicPjR6gDzw-BArk4oX_porltfCuLg",
  authDomain: "embr-21caa.firebaseapp.com",
  projectId: "embr-21caa",
  storageBucket: "embr-21caa.firebasestorage.app",
  messagingSenderId: "189057419597",
  appId: "1:189057419597:web:3888b5ca7356583a894f04",
  measurementId: "G-QH4S5EC8PN"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 