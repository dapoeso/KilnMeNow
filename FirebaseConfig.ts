import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHLUkECiiWYkSTCB1l7LxmGJj1EDi8wgI",
  authDomain: "kiln-me-now.firebaseapp.com",
  projectId: "kiln-me-now",
  storageBucket: "kiln-me-now.appspot.com",
  messagingSenderId: "875438236296",
  appId: "1:875438236296:web:56d47276e6a1af2dc9753d",
  measurementId: "G-PL3JXLFY4W"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);