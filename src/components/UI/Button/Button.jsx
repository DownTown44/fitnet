import PropTypes from 'prop-types';

let Button = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.isDisabled}>{props.children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
