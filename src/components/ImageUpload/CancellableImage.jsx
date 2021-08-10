import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/md';

const CancellableImage = (props) => {
  return (
    <div className="cancellableImage">
      <img src={props.src} alt="Uploaded image" className="cancellableImage__image"></img>
      <MdCancel className="cancellableImage__cancelButton" onClick={props.onRemove}/>
    </div>
  );
};

CancellableImage.propTypes = {
  src: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default CancellableImage;
