import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import { GrAdd } from 'react-icons/gr';

const DoubleButton = (props) => {
  const history = useHistory();
  const handleOnClick = () => {
    history.push('/groups/create');
  }

  return (
    <div className="double-button">
      <Button onClick={props.onClickList} additionalClass="double-button__list-button">{props.children}</Button>
      <GrAdd onClick={handleOnClick} className="double-button__add-button"/>
    </div>
  );
};

DoubleButton.propTypes = {
  onClickList: PropTypes.func.isRequired,
  children:  PropTypes.node.isRequired,
  onClickAdd: PropTypes.func.isRequired,
};

export default DoubleButton;
