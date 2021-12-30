// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApegch_-U_sltmA4vmQdS5S8J_6xA4gSM",
  authDomain: "virary-c5789.firebaseapp.com",
  projectId: "virary-c5789",
  storageBucket: "virary-c5789.appspot.com",
  messagingSenderId: "413214809757",
  appId: "1:413214809757:web:76f4330dfff771201f7e74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
