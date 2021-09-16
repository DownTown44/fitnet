import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Button from '../UI/Button';

const IconImage = (props) => {
  return (
    <div className={props.className}>
      <div className={`${props.className}__wrapper`}>
        <img src={props.src} alt={props.alt} />
      </div>
      <p>{props.children}</p>
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
