// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propexchange-4e027.firebaseapp.com",
  projectId: "propexchange-4e027",
  storageBucket: "propexchange-4e027.firebasestorage.app",
  messagingSenderId: "49582138952",
  appId: "1:49582138952:web:4801aa0e15163cff081a7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);