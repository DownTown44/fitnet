import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

const SearchBar = (props) => {
  let searchInput;
  
  return (
    <div 
      className={`search-bar ${props.disabled ? "search-bar--disabled" : ""}`}
      onClick={() => searchInput.focus()}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.focus}
        disabled={props.disabled}
        ref={(input) => searchInput = input}
      />
      <Icon className={`search-bar__icon ${props.disabled ? "search-bar__icon--disabled" : ""}`}>search</Icon>
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  disabled: PropTypes.bool
}

export default SearchBar;
