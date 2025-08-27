const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Use the same config as your frontend
const firebaseConfig = {
  apiKey: "AIzaSyDt-31gC5AdpkwZ-AbRTQav7KTHnuHaAME",
  authDomain: "procurement-374ed.firebaseapp.com",
  projectId: "procurement-374ed",
  storageBucket: "procurement-374ed.firebasestorage.app",
  messagingSenderId: "17053069132",
  appId: "1:17053069132:web:29a2cb8cc2bb1296bde9e9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
