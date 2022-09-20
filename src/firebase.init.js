import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBunfyvdX0TCwFxt1mKnnA9a8B_wckE-TY",
  authDomain: "visa-processing-sfs.firebaseapp.com",
  projectId: "visa-processing-sfs",
  storageBucket: "visa-processing-sfs.appspot.com",
  messagingSenderId: "703154486970",
  appId: "1:703154486970:web:fdfa71f8f651f31c088c83"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;