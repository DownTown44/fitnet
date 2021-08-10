import PropTypes from 'prop-types';

const CrossIcon = (props) => {
  return (
    <img src={props.src} alt="X" onClick={props.onClick}></img>
  );
};

CrossIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CrossIcon;
