import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavBar({ NavButton }) {
  const navButtonsName = ["transactions", "charts", "profile"];
  return (
    <nav
      className="grid grid-cols-3
                 border-t-4 border-[#333]"
    >
      {navButtonsName.map((name) => {
        const assetsPath = "/assets/";
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
