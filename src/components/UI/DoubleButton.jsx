import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import { GrAdd } from 'react-icons/gr';

const DoubleButton = (props) => {
  return (
    <div className="double-button">
      <Button onClick={props.onClickList} className="double-button__list-button">{props.children}</Button>
      <GrAdd onClick={props.onClickAdd} className="double-button__add-button"/>
    </div>
  );
};

DoubleButton.propTypes = {
  onClickList: PropTypes.func.isRequired,
  children:  PropTypes.node.isRequired,
  onClickAdd: PropTypes.func.isRequired,
};

export default DoubleButton;
