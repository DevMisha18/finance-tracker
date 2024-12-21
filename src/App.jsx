import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const Transaction = function () {
    return <h1>Transaction</h1>;
  };
  const Charts = function () {
    return <h1>Charts</h1>;
  };
  const Profile = function () {
    return <h1>Profile</h1>;
  };
  return (
    <BrowserRouter>
      <div
        className="flex flex-col justify-between
                 mx-auto w-1/4 h-[600px]
                 border-2 border-black rounded-xl"
      >
        <div className="MAIN">
          <Routes>
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <NavBar NavButton={NavButton} />
      </div>
    </BrowserRouter>
  );
}
