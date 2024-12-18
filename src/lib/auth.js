import { signInWithPopup, signOut, getAuth, linkWithCredential, GoogleAuthProvider, GithubAuthProvider, deleteUser } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Usuário logado com Google:", user);
    return user;
  } catch (error) {
    console.error("Erro ao logar com Google:", error.message);
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log("Usuário logado com GitHub:", user);
    return user;
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const providerData = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);

      const existingUser = await auth.fetchSignInMethodsForEmail(providerData);
      
      if (existingUser.length > 0) {
        const user = auth.currentUser;
        await linkWithCredential(user, credential);
        console.log("Provedor GitHub vinculado com sucesso.");
        return user;
      }
    }
    console.error("Erro ao logar com GitHub:", error.message);
  }
};

export const logout = async () => {
  try {
    const user = auth.currentUser;

    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");

    if (user) {
      await deleteUser(user);
      console.log("Conta do usuário excluída com sucesso.");
    }

  } catch (error) {
    console.error("Erro ao deslogar e excluir a conta:", error.message);
  }
};
