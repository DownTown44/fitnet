import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { createEvent } from '../../services/eventService';
import { getAccessibilities } from '../../services/accessibilityService';

import Input from '../UI/Input';
import CheckBox from '../UI/CheckBox';
import Button from '../UI/Button';
import Select from '../UI/Select';

const CreateEvent = () => {
  const history = useHistory();
  const [eventData, setEventData] = useState({
    accessibilityId: 1,
    typeId: 1,
    ownerType: JSON.parse(sessionStorage.getItem('userData')).role,
    userId: JSON.parse(sessionStorage.getItem('userData')).userId,
    name: '',
    description: '',
    address: '',
    minParticipant: 0,
    maxParticipant: 30,
    repeat: false,
    // TODO: we will need to choose hours instead of days, maybe separate component
    startDate: '',
    endDate: ''
  });

  const [accessibilityOptions, setAccessibilityOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getAccessibilities();
      setAccessibilityOptions(result)
    })();
  }, []);

  const handleChange = (event, stateName) => {
    setEventData((prevState) => {
      return {
        ...prevState,
        [stateName]: stateName === 'repeat' ? event.target.checked : event.target.value,
      };
    });
  };

  const isValid = (obj) => {
    for (let key in obj) {
      if (obj[key] === '' || obj[key] === null) {
        return false;
      }
    }

    return true;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    // TODO: on submit typeId must be set based on type of 
    // event and who created it (ex. facility creates another kind of event) 

    if (isValid(eventData)) {
      const result = await createEvent(eventData);
      if(result.created) {
        history.push(`/events/${result.id}`)
      }
    }
  }

  return (
    <form className="event-creation-form">
      <Input 
        type="text"
        onChange={event => handleChange(event, 'name')}
        value={eventData.name}
        label="Név"
        placeholder="Név"
      />

      <Input 
        type="text"
        onChange={event => handleChange(event, 'description')}
        value={eventData.description}
        label="Leírás"
        placeholder="Leírás"
      />

      <Input 
        type="text"
        onChange={event => handleChange(event, 'address')}
        value={eventData.address}
        label="Cím"
        placeholder="Cím"
      />

      <Input 
        type="number"
        onChange={event => handleChange(event, 'minParticipant')}
        value={eventData.minParticipant}
        label="Minimum Résztvevő (opcionális)"
        placeholder="Min"
      />

      <Input 
        type="number"
        onChange={event => handleChange(event, 'maxParticipant')}
        value={eventData.maxParticipant}
        label="Maximum Résztvevő (opcionális)"
        placeholder="Max"
      />

      <CheckBox
        onChange={event => handleChange(event, 'repeat')}
        isChecked={eventData.repeat}
      >
        Ismétlődő esemény
      </CheckBox>

      <Input 
        type="date"
        onChange={event => handleChange(event, 'startDate')}
        value={eventData.startDate}
        label="Kezdés"
      />

      <Input 
        type="date"
        onChange={event => handleChange(event, 'endDate')}
        value={eventData.endDate}
        label="Befejezés"
      />

      <Select optionList={accessibilityOptions} onChange={event => handleChange(event, 'accessibilityId')}>Az esemény láthatósága</Select>

      <Button onClick={(event) => onSubmit(event)}>Esemény létrehozása</Button>
    </form>
  );
};

export default CreateEvent;
