import React from 'react';
import PropTypes from 'prop-types';
import Text from '../UI/Text/Text';
import Button from '../UI/Button/Button';

const InfoBox = (props) => {
  return (
    <div>
      <img src={props.src} alt={props.alt} />
      <Text htmlTag="h3">{props.title}</Text>
      <Text htmlTag="p">{props.date}</Text>
      <Text htmlTag="p">{props.address}</Text>
      <Button onClick={props.onClick}>{props.buttonText}</Button>
    </div>
  );
}

InfoBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default InfoBox;
