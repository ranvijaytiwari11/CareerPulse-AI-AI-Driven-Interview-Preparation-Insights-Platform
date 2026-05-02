
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCVfJw_NHaKbh5sQTkthTE0A_KDg69AKv4",
  authDomain: "careerpulse-ai-4d26a.firebaseapp.com",
  projectId: "careerpulse-ai-4d26a",
  storageBucket: "careerpulse-ai-4d26a.firebasestorage.app",
  messagingSenderId: "1030445088985",
  appId: "1:1030445088985:web:23a5185fbab36d9563bec8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}