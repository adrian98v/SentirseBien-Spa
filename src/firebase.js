import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBjcpG3dosOabUFcd4FkA_0ZOTLa8ZfAE",
    authDomain: "sentirsebien-8c2c0.firebaseapp.com",
    projectId: "sentirsebien-8c2c0",
    storageBucket: "sentirsebien-8c2c0.appspot.com",
    messagingSenderId: "77859443762",
    appId: "1:77859443762:web:01fc3b2d70225c73b6582b",
    measurementId: "G-SBF0P7315B"
  };

  const app = initializeApp(firebaseConfig);

  
  const db = getFirestore(app);

  const auth = getAuth(app);

  export {auth, db}