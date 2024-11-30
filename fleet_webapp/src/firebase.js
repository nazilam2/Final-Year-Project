// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database"; // Import `ref` and `onValue` correctly
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRMUe7_uZrXbYnHxOr7fR70fT14x7hcRY",
  authDomain: "sensors-data-fe6f3.firebaseapp.com",
  databaseURL: "https://sensors-data-fe6f3-default-rtdb.firebaseio.com",
  projectId: "sensors-data-fe6f3",
  storageBucket: "sensors-data-fe6f3.firebasestorage.app",
  messagingSenderId: "862391940729",
  appId: "1:862391940729:web:bea1d1d054bbf514eb86a8",
  measurementId: "G-XERVJJ33F1"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Optional: Initialize Analytics (only if needed)
//const analytics = getAnalytics(app);

// Export necessary modules
export { database, ref, onValue };