import LeftHamburgerIcon from './icon/LeftHamburger';
import RightHamburgerIcon from './icon/RightHamburger';

const HamburgerButton = ({ isHovered }) => {
  return (
    <div
      className={`flex flex-col ${
        isHovered ? 'items-end pr-6' : 'items-center'
      }`}
    >
      {isHovered ? <RightHamburgerIcon /> : <LeftHamburgerIcon />}
    </div>
  );
};

export default HamburgerButton;
