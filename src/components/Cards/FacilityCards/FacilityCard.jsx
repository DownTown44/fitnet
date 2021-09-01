import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../UI/Text';
import Button from '../../UI/Button';

const FacilityCard = (props) => {
  return (
    <div>
      <div onClick={props.onOpen}>
        <img src={props.src} alt="facility"/>
        <Text htmlTag="h3">{props.title}</Text>
        <Text htmlTag="p">{props.address}</Text>
      </div>
    </div>
  );
}


FacilityCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default FacilityCard;
