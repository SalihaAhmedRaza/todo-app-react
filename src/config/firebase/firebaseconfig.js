// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyB2H78PsRbkCuq2R8hBZWFmtusjmMPk2Zc",
  authDomain: "todo-app-dfc8a.firebaseapp.com",
  projectId: "todo-app-dfc8a",
  storageBucket: "todo-app-dfc8a.firebasestorage.app",
  messagingSenderId: "602232101490",
  appId: "1:602232101490:web:ca9d6d7bc3e9ffa54800eb",
  measurementId: "G-MZYZB1HHPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);