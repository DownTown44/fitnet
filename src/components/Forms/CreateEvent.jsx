import React, { useState, useEffect } from 'react';

import { createEvent } from '../../services/eventService';
import { getAccessibilities } from '../../services/accessibilityService';

import Input from '../UI/Input';
import CheckBox from '../UI/CheckBox';
import Button from '../UI/Button';
import Select from '../UI/Select';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    accessibilityId: 1,
    typeId: 1,
    ownerType: sessionStorage.getItem('ownerType'),
    ownerId: sessionStorage.getItem('ownerId'),
    name: '',
    description: '',
    address: '',
    minParticipant: 0,
    maxParticipant: 30,
    repeat: false,
    startDate: '',
    endDate: ''
  });

  const [accesibilityOptions, setAccesibilityOptions] = useState([]);

  useEffect(async () => {
    const result = await getAccessibilities();
    setAccesibilityOptions(result);
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
    // TODO: on submit typeId and ownerType must be set 
    if (isValid(eventData)) {
      const result = await createEvent(eventData);
    }

    // TODO: After creation redirect to /groups/:id
    // and send a requset and load the event
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

      <Select optionList={accesibilityOptions} onChange={event => handleChange(event, 'accessibilityId')}>Az esemény láthatósága</Select>

      <Button onClick={(event) => onSubmit(event)}>Esemény létrehozása</Button>
    </form>
  );
};

export default CreateEvent;
