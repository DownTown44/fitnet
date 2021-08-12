import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AiOutlinePlus } from 'react-icons/ai';

import Text from '../../UI/Text/Text';
import Input from '../../UI/Input/Input';

const SportFieldInput = (props) => {
  const [clicked, setClicked] = useState(false);

  // If enter is pressed changes state, and displays the div instead of the input
  const onSubmit = (e) => {
    if (e.key === "Enter") {
      setClicked(false);
    }
  }

  return (
    <>
      {clicked ?
        <Input 
          type="text"
          placeholder={props.children}
          onChange={e => props.setTextState(e.target.value)}
          onKeyPress={e => onSubmit(e)}
          value={props.stateData && props.stateData }
          focus={true}
        />
      :
        <div 
          className={props.divClass}
          onClick={() => setClicked(true)}
        >
          <Text>{props.stateData === "" ? props.children : props.stateData}</Text>
          {!props.stateData && <AiOutlinePlus className="sport-field-create__plus-icon" />  }
        </div>
      }
    </>
  );
}

SportFieldInput.propTypes = {
  divClass: PropTypes.string.isRequired,
  stateData: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  setTextState: PropTypes.func.isRequired
}

export default SportFieldInput;
