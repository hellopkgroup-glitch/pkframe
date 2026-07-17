import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT4Ll2xGV1ijusoOv2jBZx4g9fpT9hPgY",
  authDomain: "pk-group-frames.firebaseapp.com",
  projectId: "pk-group-frames",
  storageBucket: "pk-group-frames.firebasestorage.app",
  messagingSenderId: "1072412518866",
  appId: "1:1072412518866:web:c20ceec05a67a14d5a800b",
};

const app = initializeApp(firebaseConfig);

// Firebase Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Optional
export default app;