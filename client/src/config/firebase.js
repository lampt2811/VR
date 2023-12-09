import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDNenxJ-_ubx5F_SNc_CiZaKKQY1c6bcis",
  authDomain: "final-9cf96.firebaseapp.com",
  projectId: "final-9cf96",
  storageBucket: "final-9cf96.appspot.com",
  messagingSenderId: "1000117471236",
  appId: "1:1000117471236:web:9a14066686abe431c34d51",
  measurementId: "G-J13XTK5Y8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
