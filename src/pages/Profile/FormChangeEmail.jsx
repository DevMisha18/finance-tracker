import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateEmail, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import PropTypes from "prop-types";

export default function FormChangeEmail({ setShowEmailForm }) {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checks
    if (newEmail !== confirmEmail) return setError("Emails don't match");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newEmail) || !emailRegex.test(confirmEmail))
      return setError("Invalid email provided");

    // Reauthenticating user
    const credential = EmailAuthProvider.credential(user.email, password);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // Update Email
        updateEmail(user, newEmail)
          .then(() => {
            setShowEmailForm(false);
            alert("Email changed successfully!");
          })
          .catch((err) => {
            console.error("Error updating email:", err);
            setError("Failed to update email. Please try again.");
          });
      })
      .catch((err) => {
        console.error("Error reauthenticating:", err);
        setError("Incorrect password. Please try again.");
      });
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-14 p-4 rounded-lg bg-white text-lg font-medium"
      >
        <div className="flex justify-between pb-6">
          <label htmlFor="email">New email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-between pb-6">
          <label htmlFor="confirm-email">Confirm email</label>
          <input
            type="email"
            id="confirm-email"
            className="form-input"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-between pb-14">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm font-normal text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-3 rounded"
          onClick={(e) => handleSubmit(e)}
        >
          Change password
        </button>
      </form>
    </>
  );
}

FormChangeEmail.propTypes = {
  setShowEmailForm: PropTypes.func.isRequired,
};
