import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import { GrAdd } from 'react-icons/gr';

const DoubleButton = (props) => {
  const history = useHistory();

  return (
    <div className="double-button">
      <Button onClick={() => history.push(`/${props.path}`)} additionalClass="double-button__list-button">{props.children}</Button>
      <GrAdd onClick={() => history.push(`/${props.path}/create`)} className="double-button__add-button"/>
    </div>
  );
};

DoubleButton.propTypes = {
  children:  PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
};

export default DoubleButton;
