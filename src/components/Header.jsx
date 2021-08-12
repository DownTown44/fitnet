import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Button from './UI/Button';

const Header = (props) => {
  return (
    <div className="header">
      <Logo src={props.logoSrc} alt={props.logoAlt} onClick={props.logoOnClick} />
      <SearchBar />
      <Button onClick={props.buttonOnClick}>Menu</Button>
    </div>
  );
};

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string.isRequired,
  logoOnClick: PropTypes.func.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
};

export default Header;
