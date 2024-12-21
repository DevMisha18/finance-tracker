import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavBar({ NavButton }) {
  const navButtonsName = ["transactions", "charts", "profile"];
  return (
    <nav
      className="grid grid-cols-3
                 border-t-2 border-black"
    >
      {navButtonsName.map((name) => {
        const assetsPath = "/public/assets/";
        const ext = ".svg";
        return (
          <Link to={`/${name}`} key={name}>
            <NavButton
              name={name}
              imgPath={assetsPath.concat(name).concat(ext)}
            />
          </Link>
        );
      })}
    </nav>
  );
}

NavBar.propTypes = {
  NavButton: PropTypes.elementType.isRequired,
};
