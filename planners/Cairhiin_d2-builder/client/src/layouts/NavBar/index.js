import React from "react";
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import NavBarContainer from './NavBarContainer';

const NavBar = ({isLoggedIn, ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} isLoggedIn={isLoggedIn} />
    </NavBarContainer>
  )
}

export default NavBar;
