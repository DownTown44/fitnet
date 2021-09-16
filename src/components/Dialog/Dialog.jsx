import React from 'react';
import PropTypes from 'prop-types';

import Text from '../UI/Text';
import Button from '../UI/Button';

const Dialog = (props) => {
  return (
    <div className="dialog">
      <Text>{props.children}</Text>
      <div className="dialog__buttons">
        <Button onClick={props.onAccept}>Igen</Button>
        <Button onClick={props.onDecline}>Nem</Button>
      </div>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
}

export default Dialog;
