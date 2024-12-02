import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw_W3NQ2DI5EABaBJdtSBttzbEniF9Mz8",
  authDomain: "visorcfc.firebaseapp.com",
  projectId: "visorcfc",
  storageBucket: "visorcfc.firebasestorage.app",
  messagingSenderId: "934379981016",
  appId: "1:934379981016:web:430d0d536b6472427a2fad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

async function verifyAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
}

async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
}

export { loginUser, verifyAuth, registerUser, logout };
