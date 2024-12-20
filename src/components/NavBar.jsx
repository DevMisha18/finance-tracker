import PropTypes from "prop-types";

export default function NavBar({ NavButton }) {
  const navButtonsName = ["transaction", "charts", "profile"];
  return (
    <nav
      className="grid grid-cols-3
                 border-t-2 border-black"
    >
      {navButtonsName.map((name) => {
        const assetsPath = "/public/assets/";
        const ext = ".svg";
        return (
          <NavButton
            key={name}
            name={name}
            imgPath={assetsPath.concat(name).concat(ext)}
          />
        );
      })}
    </nav>
  );
}

NavBar.propTypes = {
  NavButton: PropTypes.elementType.isRequired,
};
