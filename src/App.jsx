import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { DbProvider } from "./context/DbContext";
import SignUpForm from "./components/SignUpForm";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";

export default function App() {
  const { user } = useAuth();
  const uid = user?.uid ?? "";

  return (
    <BrowserRouter basename={"/finance-tracker"}>
      <main
        className="flex flex-col justify-between
                 mx-auto w-[var(--phone-width)] h-[var(--phone-height)]
                 border-phone rounded-xl"
      >
        {!user ? (
          <SignUpForm />
        ) : (
          <DbProvider uid={uid}>
            <div className="pt-[var(--phone-padding)] px-[var(--phone-padding)]">
              <Routes>
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </DbProvider>
        )}
        <NavBar NavButton={NavButton} />
      </main>
    </BrowserRouter>
  );
}
