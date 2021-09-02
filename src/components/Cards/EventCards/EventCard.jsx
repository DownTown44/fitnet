import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../UI/Text';
import Button from '../../UI/Button';

const EventCard = (props) => {
  return (
    <div>
      <div onClick={props.onOpen}>
        <img src={props.src} alt="event" />
        <Text htmlTag="h3">{props.title}</Text>
        <Text htmlTag="p">{props.date}</Text>
        <Text htmlTag="p">{props.address}</Text>
      </div>
      <Button onClick={props.onClick}>{props.buttonText}</Button>
    </div>
  );
}

EventCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default EventCard;
