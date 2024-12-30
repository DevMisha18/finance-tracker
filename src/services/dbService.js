import { db } from "../../firebase.config";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";

// creates doc with uid
async function setUpUser(uid) {
  const userDocRef = doc(db, "/users", uid);
  await setDoc(userDocRef, {});
}

// creates subcollection "expenses" and adds expense to it
function addExpense(uid, type, money) {
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
    addDoc(expensesCol, { type, money });
  } catch (err) {
    console.log(err);
  }
}

export { setUpUser, addExpense };
