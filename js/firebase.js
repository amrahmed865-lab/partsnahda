import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ1RAn4fIN6Rqc-b5-BoHiiNFQ9GvZZJA",
  authDomain: "parts-7e82e.firebaseapp.com",
  projectId: "parts-7e82e",
  storageBucket: "parts-7e82e.firebasestorage.app",
  messagingSenderId: "198514736431",
  appId: "1:198514736431:web:3e88fb478f4cfc910035da",
  measurementId: "G-8PS0P7Z95X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
