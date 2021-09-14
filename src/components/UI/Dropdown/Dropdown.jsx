import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DropdownItem from './DropdownItem';
import Icon from '@material-ui/core/Icon';

// TODO: make dropdown open upwards if it sticks out of screen
const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!props.disabled) {
      props.optionList.map((option) => {
        option.default && setSelected(option);
      });

      props.returnSelected(selected.value);
    }
  }, [props.optionList]);

  const handleChange = (option) => {
    setSelected(option);
    setIsActive(false);
    props.returnSelected(option.value);
  }

  return (
    <div className="dropdown">
      <div 
        className={`dropdown__button ${isActive ? 'dropdown__button--active' : ""} ${props.disabled ? 'dropdown__button--disabled' : ""}`} 
        onClick={() => !props.disabled && setIsActive(!isActive)}>
        {selected ? 
         <p className="dropdown__selected">{selected.text}</p> :
         <p>{props.placeholder}</p>
        }
        <Icon className={`dropdown__icon ${isActive ? 'dropdown__icon--opened' : ""} ${props.disabled ? 'dropdown__icon--disabled' : ""}`}>expand_more</Icon>
      </div>
      {isActive &&
        <div className="dropdown__content">
          {props.optionList.map((option) => {
            return (
              <DropdownItem key={option.value} text={option.text} onClick={() => handleChange(option)}/>
            )
          })}
        </div>
      }
    </div>
  );
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  optionList: PropTypes.array.isRequired,
  returnSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default Dropdown;
