// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGJzuB_tskEK3CpaKiinqElRR0tJhEkQo",
  authDomain: "projectmanagementsystem-87e4d.firebaseapp.com",
  projectId: "projectmanagementsystem-87e4d",
  storageBucket: "projectmanagementsystem-87e4d.appspot.com",
  messagingSenderId: "584112056312",
  appId: "1:584112056312:web:cf0eca619d1996be35d80d",
  measurementId: "G-6NS59ET6G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage,analytics };