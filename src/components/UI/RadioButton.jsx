import PropTypes from 'prop-types';

const RadioButton = (props) => {
  return (
    <div className={`radio-button ${props.additionalClass}`}>
      <input type="radio" className="radio-button__input" onChange={props.onChange} checked={props.isChecked} disabled={props.isDisabled} />
      <label className="radio-button__label">
        <span className="radio-button__button"></span>
        {props.children}
      </label>
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
