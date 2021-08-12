import PropTypes from 'prop-types';

const RadioButton = (props) => {
  return (
    <div>
      <input type="radio" onChange={props.onChange} checked={props.isChecked} disabled={props.isDisabled} />
      <label>{props.children}</label>
    </div>
  );
};

RadioButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
};

export default RadioButton;
