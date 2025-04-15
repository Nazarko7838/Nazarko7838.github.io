// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD8DCjTJ5_iX9y0HIYvwtarAO8f_8ZSIns",
    authDomain: "easylanguage-c5acf.firebaseapp.com",
    projectId: "easylanguage-c5acf",
    storageBucket: "easylanguage-c5acf.firebasestorage.app",
    messagingSenderId: "542911027772",
    appId: "1:542911027772:web:ec3cca7bc2efd7dc138139",
    measurementId: "G-RGQSM7LC23"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
