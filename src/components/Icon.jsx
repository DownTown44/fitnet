import PropTypes from 'prop-types';

const Icon = (props) => {
  return (
    <img src={props.src} alt={props.alt} onClick={props.onClick}></img>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Icon;
