// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAfmU29MjKWel_SQGO5tTpSwAYrEQqY9g",
  authDomain: "tipverse-ea869.firebaseapp.com",
  projectId: "tipverse-ea869",
  storageBucket: "tipverse-ea869.appspot.com",
  messagingSenderId: "382925542702",
  appId: "1:382925542702:web:0d9c2fb9095d24cdca96bf",
  measurementId: "G-T6GCVJMTKT"
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