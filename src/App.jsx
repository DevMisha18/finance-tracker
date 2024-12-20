import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";

export default function App() {
  return (
    <div
      className="flex flex-col justify-between
                 mx-auto w-1/4 h-[600px]
                 border-2 border-black rounded-xl"
    >
      <div>main</div>
      <NavBar NavButton={NavButton} />
    </div>
  );
}
