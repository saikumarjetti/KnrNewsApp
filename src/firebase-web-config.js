// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi7p8XBZzkXf4wqTAgGkdemsVduWdGfMQ",
  authDomain: "knrchannel-site.firebaseapp.com",
  projectId: "knrchannel-site",
  storageBucket: "knrchannel-site.firebasestorage.app",
  messagingSenderId: "288821282823",
  appId: "1:288821282823:web:5d72261fc9ca1947d1c2a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
