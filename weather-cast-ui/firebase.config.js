import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArvt3GYpHaDjPa_xzp3zTfjWZuF5FM0t0",
  authDomain: "weather-cast-b45ae.firebaseapp.com",
  projectId: "weather-cast-b45ae",
  storageBucket: "weather-cast-b45ae.appspot.com",
  messagingSenderId: "958074184284",
  appId: "1:958074184284:web:8a6704de3fcb94a3fe3c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;