import PropTypes from 'prop-types';

const Backdrop = (props) => (
  props.isShown ? <div className='backdrop' onClick={props.onClick}></div> : null
);

Backdrop.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Backdrop;
