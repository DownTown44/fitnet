import PropTypes from 'prop-types';

const Input = (props) => {
  return (
    <input 
      type={props.type} 
      onChange={props.onChange} 
      onKeyPress={props.onKeyPress}
      disabled={props.isDisabled} 
      placeholder={props.placeholder}
      value={props.value}
      autoFocus={props.focus}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool
};

Input.defaultProps = {
  isDisabled: false,
  autoFocus: false
};

export default Input;
