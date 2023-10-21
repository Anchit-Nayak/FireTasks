// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Required for side-effects
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXzObS_KbiOysGmwGOlqa7aBTliIjsE-k",
  authDomain: "todo-app-41608.firebaseapp.com",
  projectId: "todo-app-41608",
  storageBucket: "todo-app-41608.appspot.com",
  messagingSenderId: "869349319642",
  appId: "1:869349319642:web:9b909c834fb2040d9196e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);