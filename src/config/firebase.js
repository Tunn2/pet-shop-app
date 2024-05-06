// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIWh2YyXPe6gPc7JHOHDGmxgR0rbDKHE8",
  authDomain: "netflix-clone-618f2.firebaseapp.com",
  projectId: "netflix-clone-618f2",
  storageBucket: "netflix-clone-618f2.appspot.com",
  messagingSenderId: "376615008112",
  appId: "1:376615008112:web:a7664e9abb8891fc6781b5",
  measurementId: "G-WV7ZX1Q521"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };