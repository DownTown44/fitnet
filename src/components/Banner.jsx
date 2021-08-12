import React from 'react';
import PropTypes from 'prop-types';
import Button from './UI/Button';
import Text from './UI/Text';
import IconImage from './IconImage/IconImage';

const Banner = (props) => {
  return (
    <div className="banner">
      <img src={props.src} alt={props.alt} className="banner-image" />
      <Button onClick={props.onClick} className="banner-button">Vissza</Button>
      <IconImage src={props.iconSrc} alt={props.iconAlt} exitable={false} className="banner-icon">{props.iconText}</IconImage>
      <Text htmlTag="h3" className="banner-title">{props.title}</Text>
      <Text htmlTag="p" className="banner-accesibility">{props.accesibility}</Text>
    </div>
  );
};

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  iconText: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  accesibility: PropTypes.node.isRequired,
};

export default Banner;
