import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = (props) => {
  return (
    <div class={`toggle-switch ${props.additionalClass}`}>
      <input 
        type="checkbox" 
        className={"toggle-switch__checkbox"}
        onChange={props.onChange}
        checked={props.isChecked}
        disabled={props.isDisabled}
      />
    </div>
  );
}

ToggleSwitch.propTypes = {
  additionalClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
}

export default ToggleSwitch;
