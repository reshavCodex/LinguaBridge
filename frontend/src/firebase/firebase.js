import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnJ_0E3X7i3yyaJO6bIWoQHV7YCU5okDg",
  authDomain: "linguabridge-dfb59.firebaseapp.com",
  projectId: "linguabridge-dfb59",
  storageBucket: "linguabridge-dfb59.firebasestorage.app",
  messagingSenderId: "669197264726",
  appId: "1:669197264726:web:9bb8cc3d0306f92b9dd8f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;