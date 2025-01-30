import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6CO8qXGNrEZukVh4-NC8tiqPDjhDpcnU",
    authDomain: "portaria-diadema.firebaseapp.com",
    projectId: "portaria-diadema",
    storageBucket: "portaria-diadema.firebasestorage.app",
    messagingSenderId: "978644385430",
    appId: "1:978644385430:web:6b53cff436ee955225ccb7",
    measurementId: "G-PHW6VF2SEF"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, deleteDoc };
