import React, { useState } from 'react';

import { createEvent } from '../../services/eventService';

import Input from '../UI/Input';
import CheckBox from '../UI/CheckBox';
import Button from '../UI/Button';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    accessibilityId: null,
    typeId: null,
    ownerType: '',
    ownerId: sessionStorage.getItem('ownerId'),
    name: '',
    description: '',
    address: '',
    minParticipant: null,
    maxParticipant: null,
    repeat: false,
    startDate: '',
    endDate: ''
  });



  const handleChange = (event, stateName) => {
    setEventData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await createEvent(eventData);

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
        label="Végzés"
      />

      <Button onClick={(event) => onSubmit(event)}>Esemény létrehozása</Button>
    </form>
  );
};

export default CreateEvent;
