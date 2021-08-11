import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../UI/Input/Input';

const SearchBar = (props) => {
  const [text, setText] = useState('');

  return (
    <div className="search-bar">
      <Input type="text" onChange={e => setText(e.target.value)} />
    </div>
  );
};

export default SearchBar;
