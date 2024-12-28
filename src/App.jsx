import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SignUpForm from "./components/SignUpForm";
import Transactions from "./pages/Transactions";
import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";

export default function App() {
  const { user } = useAuth();

  const Charts = function () {
    return <h1>Charts</h1>;
  };
  const Profile = function () {
    return <h1>Profile</h1>;
  };

  return (
    <BrowserRouter>
      <main
        className="flex flex-col justify-between
                 mx-auto w-[var(--phone-width)] h-[var(--phone-height)]
                 border-phone rounded-xl"
      >
        {!user ? (
          <SignUpForm />
        ) : (
          <div className="pt-[var(--phone-padding)] px-[var(--phone-padding)]">
            <Routes>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        )}
        <NavBar NavButton={NavButton} />
      </main>
    </BrowserRouter>
  );
}
