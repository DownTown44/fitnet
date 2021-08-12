import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Logo = (props) => {
  return (
    <div onClick={props.onClick} className="logo">
      <Icon src={props.src} alt={props.alt} className="logo-icon"/>
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Logo;
