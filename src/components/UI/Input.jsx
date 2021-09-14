import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Text from './Text';

const Input = (props) => {
  let disabledClass = "";
  if(props.isDisabled) {
    disabledClass = "input-box__field--disabled";
  }

  return (
    <div className="input-box">
      {props.label && <Text className="input-box__label">{props.label}</Text>}
      <div className={`input-box__field input-box__field--${props.size} input-box__field--${props.invalid} ${props.additionalClass} ${disabledClass}`}>
        <Icon className="input-box__icon">{props.iconName}</Icon>
        <input
          type={props.type} 
          onChange={props.onChange} 
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.isDisabled} 
          autoFocus={props.focus}
        />
      </div>
      {props.validationLabel && <Text className={`input-box__validation-label input-box__validation-label--${props.invalid}`}>{props.validationLabel}</Text>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  // size is a classname, accepts 3 values: large, medium, small
  size: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  // invalid is a classname, accepts 2 values: warning, error
  invalid: PropTypes.string,
  validationLabel: PropTypes.string,
};

Input.defaultProps = {
  isDisabled: false,
  autoFocus: false
};

export default Input;
