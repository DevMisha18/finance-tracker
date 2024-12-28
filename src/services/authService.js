import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.config";

const signUpUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { signUpUser, signInUser };
