import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../UI/Text';
import Button from '../../UI/Button';

const GroupCard = (props) => {
  return (
    <div>
      <div onClick={props.onOpen}>
        <img src={props.src} alt={props.alt} />
        <Text htmlTag="h3">{props.title}</Text>
      </div>
      <Button onClick={props.onClick}>{props.buttonText}</Button>
    </div>
  );
}

GroupCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
}


export default GroupCard;
