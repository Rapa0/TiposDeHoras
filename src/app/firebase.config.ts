// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcaswst_aw8XpqxsmJhhB7F3U7i3-rpDQ",
  authDomain: "relojes-8d14f.firebaseapp.com",
  projectId: "relojes-8d14f",
  storageBucket: "relojes-8d14f.firebasestorage.app",
  messagingSenderId: "1084619175399",
  appId: "1:1084619175399:web:be27e01ab162317003b942",
  measurementId: "G-J3ZK1V55K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };