import React from 'react';
import PropTypes from 'prop-types';

import Text from '../UI/Text';
import Button from '../UI/Button';

const Dialog = (props) => {
  return (
    <div>
      <Text>{props.children}</Text>
      <Button onClick={props.onAccept}>Igen</Button>
      <Button onClick={props.onDecline}>Nem</Button>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
}

export default Dialog;
