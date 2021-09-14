import React from 'react';
import PropTypes from 'prop-types';

const ColorBox = (props) => {
  return (
    <div className="color-preview">
      <div className={`${props.className} color-preview__color`} />
      <p className="color-preview__code">{props.colorCode}</p>
      <p className="color-preview__name">{props.colorName}</p>
    </div>
  );
}

ColorBox.propTypes = {
  className: PropTypes.string.isRequired,
  colorCode: PropTypes.string,
  colorName: PropTypes.string.isRequired,
}

export default ColorBox;
