const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyA7ziURo8U4Hp5P5AdHPhBqGPlLoPnXInU",
    authDomain: "regulate-db.firebaseapp.com",
    projectId: "regulate-db",
    storageBucket: "regulate-db.appspot.com",
    messagingSenderId: "174842912126",
    appId: "1:174842912126:web:63b2ec38d50827374ca72f"
  };
  
// Initialize Firestore
const db = getFirestore(initializeApp(firebaseConfig));

module.exports = db;