import React from 'react';
import PropTypes from 'prop-types';

const Textarea = (props) => {
  return (
    <textarea
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      rows={props.rows}
      cols={props.cols}
      maxLength={props.maxLength}
      style={{resize: 'none'}}
    />
  );
}

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.string,
  cols: PropTypes.string,
  maxLength: PropTypes.string,
  resizable: PropTypes.bool
}

export default Textarea;
