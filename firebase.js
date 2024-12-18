import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRkU3t3l6RfCZF2qKRkSWQKcEoXig3j4U",
    authDomain: "marvel-teste.firebaseapp.com",
    projectId: "marvel-teste",
    storageBucket: "marvel-teste.firebasestorage.app",
    messagingSenderId: "351513694190",
    appId: "1:351513694190:web:06369f812d0201abbb08ff"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  export const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };
  
  export const signInWithGitHub = async () => {
    await signInWithPopup(auth, githubProvider);
  };
  
  export { auth, googleProvider, githubProvider };