import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/md';

import Text from '../UI/Text/Text';

const SportField = (props) => {
  return (
    <div className="sportFieldContainer">
      <div className="sportField">
        <div className="sportField__imageBox">
          <img src={props.image} alt="Sport field" className="sportField__image" />
        </div>
        <div className="sportField__title">
          <Text htmlTag="h3">{props.title}</Text>
        </div>
        <div className="sportField__description">
          <Text>{props.description}</Text>
        </div>
        <div className="sportField__price">
          <Text>{props.price}</Text>
        </div>
      </div>
      <MdCancel className="sportFieldContainer__cancelButton" onClick={props.onRemove}/>
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
