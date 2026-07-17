import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebaseConfig";

/* ==========================================
   ADMIN LOGIN
========================================== */

export async function loginAdmin(email, password) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

/* ==========================================
   ADMIN LOGOUT
========================================== */

export async function logoutAdmin() {
  return await signOut(auth);
}

/* ==========================================
   CURRENT USER
========================================== */

export function getCurrentUser() {
  return auth.currentUser;
}

/* ==========================================
   AUTH LISTENER
========================================== */

export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback);
}