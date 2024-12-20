import PropTypes from "prop-types";

export default function NavButton({ name, imgPath }) {
  return (
    <div
      className="flex flex-col justify-center items-center
                 hover:transition-colors duration-300 ease-in
                 hover:cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
    >
      <img src={imgPath} />
      <p className="text-xs">{name}</p>
    </div>
  );
}

NavButton.propTypes = {
  name: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
};
