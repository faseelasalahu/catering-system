
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzEX-CAjgAz-W35uTSGtmRwC2SNGLe0Q8",
  authDomain: "catering-system-cf62a.firebaseapp.com",
  projectId: "catering-system-cf62a",
  storageBucket: "catering-system-cf62a.firebasestorage.app",
  messagingSenderId: "92643480515",
  appId: "1:92643480515:web:8bf7b41490183c1b5d6376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 