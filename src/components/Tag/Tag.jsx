import PropTypes from 'prop-types';
import Icon from './Icon';

const Tag = (props) => {
  return (
    <div>
      <Icon src={props.src} alt={props.alt} />
      <p>{props.children}</p>
    </div>
  );
}

Tag.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Tag;
