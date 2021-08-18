import PropTypes from 'prop-types';

import Text from './Text';

const Input = (props) => {
  return (
    <div className="input-box">
      {props.label && <Text className="input-box__label">{props.label}</Text>}
      <input
        className="input-box__field"
        type={props.type} 
        onChange={props.onChange} 
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.isDisabled} 
        autoFocus={props.focus}
      />
      {props.validationLabel && <Text className="input-box__validation-label">{props.validationLabel}</Text>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  validationLabel: PropTypes.string
};

Input.defaultProps = {
  isDisabled: false,
  autoFocus: false
};

export default Input;
