import PropTypes from 'prop-types';

let Input = (props) => {
  return (
    <input type={props.type} onChange={props.onChange} disabled={props.isDisabled} />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
};

Input.defaultProps = {
  isDisabled: false
};

export default Input;
