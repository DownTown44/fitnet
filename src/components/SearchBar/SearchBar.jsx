import React, { useState } from 'react';
import Input from '../UI/Input/Input';

const SearchBar = () => {
  const [text, setText] = useState('');

  return (
    <div className="search-bar">
      <Input type="text" onChange={e => setText(e.target.value)} />
    </div>
  );
};

export default SearchBar;
