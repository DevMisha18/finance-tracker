import { db } from "../../firebase.config";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// creates doc with uid
async function setUpUser(uid) {
  const userDocRef = doc(db, "/users", uid);
  await setDoc(userDocRef, {});
}

// creates subcollection "expenses" and adds expense to it
function addTransaction(uid, type, money) {
  if (!uid || !type || !money) {
    console.error("Invalid data: Missing uid, type, or money");
    console.log("uid: " + uid);
    console.log("type: " + type);
    console.log("money: " + money);
    return;
  }
  try {
    const userDocRef = doc(db, "/users", uid);
    const expensesCol = collection(userDocRef, "expenses");
    addDoc(expensesCol, { type, money, timestamp: serverTimestamp() });
  } catch (err) {
    console.log(err);
  }
}

const getUserData = async (uid) => {
  const userDocRef = collection(db, "users", uid, "expenses");
  const q = query(userDocRef, orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  const expenses = [];
  querySnapshot.forEach((doc) => {
    expenses.push(doc.data());
  });
  console.log(expenses);
  return expenses;
};

export { setUpUser, addTransaction, getUserData };
