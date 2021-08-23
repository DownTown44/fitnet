import PropTypes from 'prop-types';
import CrossIcon from './CrossIcon';
import Icon from '../Icon'

const IconImage = (props) => {
  return (
    <div>
      <Icon src={props.src} alt={props.alt} />
      <p>{props.children}</p>
      {props.removable && <CrossIcon onClick={props.onRemove} />}
    </div>
  );
}

 IconImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default IconImage;
