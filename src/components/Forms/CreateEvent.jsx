import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { createEvent, getEventById, updateEvent } from '../../services/eventService';
import { getAccessibilities } from '../../services/accessibilityService';

import Input from '../UI/Input';
import CheckBox from '../UI/CheckBox';
import Button from '../UI/Button';
import Select from '../UI/Select';

const CreateEvent = (props) => {
  const history = useHistory();
  const [eventData, setEventData] = useState({
    accessibilityId: 1,
    typeId: 1,
    groupId: null,
    ownerType: JSON.parse(sessionStorage.getItem('userData')).role,
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
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    getAccessibilities().then((result) => {
      if (location.state) {
        // if we mount this componenet from group view, then we need everything except invisible
        result.splice(2, 1);
        setAccessibilityOptions(result);
      } else {
        // if we mount this componenet out of group view, then we need everything except invisible, and group private
        setAccessibilityOptions(result.slice(0, result.length - 2));
      }
    });

    if (props.edit) {
      getEventById(id).then((result) => {
        setEventData(result);
      });
    }
  }, []);

  useEffect(() => {
    if (eventData.accessibilityId === '4') {
      setEventData((prevState) => {
        return {
          ...prevState,
          groupId: location.state.groupId
        }
      });
    // we need to set back the groupId to null if accessibilityId isnt equals to 4
    } else {
      setEventData((prevState) => {
        return {
          ...prevState,
          groupId: null
        }
      });
    }
  }, [eventData.accessibilityId]);

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
      if (key !== 'groupId' && (obj[key] === '' || obj[key] === null)) {
        return false;
      }
    }

    return true;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    // TODO: on submit typeId must be set based on type of event and who created it (ex. facility creates another kind of event) 
    if (isValid(eventData)) {
      const result = await createEvent(eventData);
      if(result.created) {
        history.push(`/events/${result.id}`);
      }
    }
  }

  const onModify = async (event) => {
    event.preventDefault();

    if (isValid(eventData)) {
      const result = await updateEvent(id, eventData);
      if (result.created) {
        history.push(`/events/${result.id}`);
      }
    }
  }

  return (
    <form className="form center">
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
        type="datetime-local"
        onChange={event => handleChange(event, 'startDate')}
        value={eventData.startDate}
        label="Kezdés"
      />

      <Input 
        type="datetime-local"
        onChange={event => handleChange(event, 'endDate')}
        value={eventData.endDate}
        label="Befejezés"
      />

      <Select optionList={accessibilityOptions} onChange={event => handleChange(event, 'accessibilityId')}>Az esemény láthatósága</Select>

      {
        props.edit ?
        <Button onClick={(event) => onModify(event)}>Esemény módosítása</Button> :
        <Button onClick={(event) => onSubmit(event)}>Esemény létrehozása</Button>
      }
    </form>
  );
};

CreateEvent.propTypes = {
  edit: PropTypes.bool
}

CreateEvent.defaultProps = {
  edit: false
}

export default CreateEvent;
