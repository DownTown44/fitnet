import PropTypes from 'prop-types';
import CrossIcon from './CrossIcon';
import Icon from '../Icon'

const IconImage = (props) => {
  return (
    <div>
      <Icon src={props.src} alt={props.alt} />
      <p>{props.children}</p>
      {props.exitable && <CrossIcon src={props.crossSrc} />}
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
