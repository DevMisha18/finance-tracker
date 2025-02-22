import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import PropTypes from "prop-types";

export default function FormChangePassword({ setShowPasswordForm }) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checks
    if (newPassword !== confirmPassword)
      return setError("Passwords don't match");

    // Reauthenticating user
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // Update Password
        updatePassword(user, newPassword)
          .then(() => {
            setShowPasswordForm(false);
            alert("Password changed successfully!");
          })
          .catch((err) => {
            console.error("Error updating password:", err);
            setError("Failed to update password. Please try again.");
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
        className="mt-14 p-4 rounded-lg bg-white font-medium"
      >
        <div className="flex justify-between gap-2 pb-6">
          <label htmlFor="current-password">Current password</label>
          <input
            type="password"
            id="current-password"
            className="form-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between  gap-2 pb-6">
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            id="new-password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-2 pb-14">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

FormChangePassword.propTypes = {
  setShowPasswordForm: PropTypes.func.isRequired,
};
