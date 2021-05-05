import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API,
    authDomain: import.meta.env.VITE_APP_FIREBASE_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_FIREBASE_URL,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
};
// Initialize Firebase
//console.log(import.meta.env);
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore;

// collections
const usersCollection = db.collection('users');
const photosCollection = db.collection('photos');

export { db, auth, usersCollection, photosCollection, firestore };
