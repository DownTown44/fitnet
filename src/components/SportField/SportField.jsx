import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/md';

import Text from '../UI/Text/Text';

const SportField = (props) => {
  return (
    <div className="sport-field__container">
      <div className="sport-field__card">
        <div className="sport-field__image-box">
          <img src={props.image} alt="Sport field" className="sport-field__image" />
        </div>
        <div className="sport-field__title">
          <Text htmlTag="h3">{props.title}</Text>
        </div>
        <div className="sport-field__description">
          <Text>{props.description}</Text>
        </div>
        <div className="sport-field__price">
          <Text>{props.price}</Text>
        </div>
      </div>
      <MdCancel className="sport-field__cancel-button" onClick={props.onRemove}/>
    </div>
  );
}

SportField.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default SportField;
