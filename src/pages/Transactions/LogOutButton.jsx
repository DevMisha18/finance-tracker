import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";

export default function LogOutButton() {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="px-6 py-2 bg-red-500 text-sm text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
    >
      Log Out
    </button>
  );
}
