import React from 'react';

const DropdownItem = (props) => {
  return (
    <div className="dropdown__item" onClick={() => props.onClick()}>
      <p>{props.text}</p>
    </div>
  );
}

export default DropdownItem;
