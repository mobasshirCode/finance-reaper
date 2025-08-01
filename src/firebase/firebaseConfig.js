// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoe53SP0DoMNmIDQPArjlcNSQ3quOGHVM",
  authDomain: "finance-reaper.firebaseapp.com",
  projectId: "finance-reaper",
  storageBucket: "finance-reaper.firebasestorage.app",
  messagingSenderId: "935412613470",
  appId: "1:935412613470:web:17ff47c7136f8073590fcf",
  measurementId: "G-JF72BR1PV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);  