// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdgQYnzlPKOOCeW9_az2dpDpcN6OayYuE",
  authDomain: "fir-practice-323ff.firebaseapp.com",
  projectId: "fir-practice-323ff",
  storageBucket: "fir-practice-323ff.appspot.com",
  messagingSenderId: "1065057119303",
  appId: "1:1065057119303:web:c1180c14cd87ef29c59562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();