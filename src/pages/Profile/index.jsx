import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormChangeEmail from "./FormChangeEmail";
import FormChangePassword from "./FormChangePassword";

export default function Profile() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { user } = useAuth();
  const email = user.email;
  return (
    <>
      <div className="relative pb-4 border-b-2 border-black text-center">
        <h2 className="mb-2">{`email: ${email}`}</h2>
        <div className="flex justify-center gap-4">
          <button
            className="change-x-btn"
            onClick={() => {
              setShowEmailForm(true);
              setShowPasswordForm(false);
            }}
          >
            change email
          </button>
          <button
            className="change-x-btn"
            onClick={() => {
              setShowEmailForm(false);
              setShowPasswordForm(true);
            }}
          >
            change password
          </button>
        </div>
      </div>
      {showEmailForm && <FormChangeEmail setShowEmailForm={setShowEmailForm} />}
      {showPasswordForm && (
        <FormChangePassword setShowPasswordForm={setShowPasswordForm} />
      )}
    </>
  );
}
