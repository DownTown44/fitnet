import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import Text from './UI/Text';
import Button from './UI/Button';

const NotificationBox = (props) => {
  return (
    <div>
      <Icon src={props.src} alt={props.alt} />
      <Text htmlTag="h3">{props.title}</Text>
      <Text htmlTag="p">{props.date}</Text>
      <Text htmlTag="p">{props.address}</Text>
      <Button onClick={props.onDecl}></Button>
      <Button onClick={props.onAccept}>Csatlakozas</Button>
    </div>
  );
}

NotificationBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onDecl: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
}

export default NotificationBox;
