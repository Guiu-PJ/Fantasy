// Importa los módulos de Firebase desde el CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { getFirestore, setDoc, getDoc, doc, collection, query, where, getDocs, writeBatch } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
	apiKey: "AIzaSyD5tTHcJr07qDYph3ORiybSDdglSKVXZIw",
	authDomain: "fantasy-325b5.firebaseapp.com",
	projectId: "fantasy-325b5",
	storageBucket: "fantasy-325b5.firebasestorage.app",
	messagingSenderId: "241991812845",
	appId: "1:241991812845:web:57ca256e6f1a301866aee4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Usa los servicios de Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);

console.log('Firebase initialized', { auth, firestore });
export { auth, firestore, setDoc, getDoc, doc, collection, query, where, getDocs, writeBatch };