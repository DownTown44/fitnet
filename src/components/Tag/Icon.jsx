import PropTypes from 'prop-types';

const Icon = (props) => {
  return (
    <img src={props.src} alt={props.alt}></img>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Icon;
