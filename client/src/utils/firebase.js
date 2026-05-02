
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyCVfJw_NHaKbh5sQTkthTE0A_KDg69AKv4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "careerpulse-ai-4d26a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "careerpulse-ai-4d26a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "careerpulse-ai-4d26a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1030445088985",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1030445088985:web:23a5185fbab36d9563bec8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}