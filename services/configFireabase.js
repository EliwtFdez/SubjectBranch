import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhMG8-492N0XFsf3i1nsDx1adhZ5MwEag",
  authDomain: "appsubjects-a120a.firebaseapp.com",
  projectId: "appsubjects-a120a",
  storageBucket: "appsubjects-a120a.appspot.com",
  messagingSenderId: "713501623104",
  appId: "1:713501623104:web:3315e702b11fdce84cb0a5",
  measurementId: "G-5FJ5ZCCHD2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
