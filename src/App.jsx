import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { DbProvider } from "./context/DbContext";
import SignUpForm from "./components/SignUpForm";
import Transactions from "./pages/Transactions";
import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";

export default function App() {
  const { user } = useAuth();
  let uid = "";
  if (user) uid = user.uid;
  // const isProduction = import.meta.env.MODE === "production";

  const Charts = function () {
    return (
      <h1>Supposed to show charts for you expenses info, not done yet😭</h1>
    );
  };
  const Profile = function () {
    return <h1>Supposed to show profile info, not done yet😭</h1>;
  };
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
