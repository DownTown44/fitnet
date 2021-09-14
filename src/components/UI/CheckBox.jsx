import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

const CheckBox = (props) => {
  return (
    <div className={`checkbox ${props.additionalClass}`}>
      <div className="checkbox__container">
        <input 
          className="checkbox-styled" 
          type="checkbox"  
          onChange={props.onChange} 
          checked={props.isChecked} 
          disabled={props.isDisabled}
        />
        <Icon className="md30 checkbox__icon" onClick={props.onChange}>done</Icon>
      </div>
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
