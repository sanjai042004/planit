import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo85FiYbI26GUqPDnXQeuFnXycI432eTI",
  authDomain: "planit-t.firebaseapp.com",
  projectId: "planit-t",
  storageBucket: "planit-t.firebasestorage.app",
  messagingSenderId: "950041268414",
  appId: "1:950041268414:web:203b3a727174d15ea4ceef",
  measurementId: "G-L0X49YLZC4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();