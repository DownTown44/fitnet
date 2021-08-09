import PropTypes from 'prop-types';

const CheckBox = (props) => {
  return (
    <div>
      <input type="checkbox" onChange={props.onChange} checked={props.isChecked} disabled={props.isDisabled} />
      <label>{props.children}</label>
    </div>
  );
};

CheckBox.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

CheckBox.defaultProps = {
  isChecked: false,
  isDisabled: false,
};

export default CheckBox;
