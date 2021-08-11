import PropTypes from 'prop-types';
import CrossIcon from './CrossIcon';
import Icon from '../Icon/Icon'

const IconImage = (props) => {
  let cross = null;

  if (props.exitable) {
    cross = (
      <CrossIcon src={props.crossSrc} />
    )
  }
  
  return (
    <div>
      <Icon src={props.src} alt={props.alt} />
      <p>{props.children}</p>
      {cross}
    </div>
  );
}
 IconImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  exitable: PropTypes.bool.isRequired,
  crossAlt: PropTypes.string,
  crossSrc: PropTypes.string
};

export default IconImage;
