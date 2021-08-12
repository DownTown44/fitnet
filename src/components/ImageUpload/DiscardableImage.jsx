import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/md';

const DiscardableImage = (props) => {
  return (
    <div className="discardable-image">
      <img src={props.src} alt="Uploaded image" className="discardable-image__image"></img>
      <MdCancel className="discardable-image__cancelButton" onClick={props.onRemove}/>
    </div>
  );
};

DiscardableImage.propTypes = {
  src: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default DiscardableImage;
