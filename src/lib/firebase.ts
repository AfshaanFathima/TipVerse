// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm1kSdOWx-FR1igpPFQJ57L79F0rddanA",
  authDomain: "tipverse-ce3e2.firebaseapp.com",
  projectId: "tipverse-ce3e2",
  storageBucket: "tipverse-ce3e2.firebasestorage.app",
  messagingSenderId: "791862017184",
  appId: "1:791862017184:web:3c6e33ab9fb4ae6799ddc5",
  measurementId: "G-6C3F10QQ8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Google Auth setup
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export { auth, googleProvider };