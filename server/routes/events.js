import express from 'express';

import { 
  createEvent,
  inviteUserToEvent,
  removeUserFromEvent,
  userIsMemberOfEvent,
  joinUserIntoEvent,
  getEventById,
  getLastMinuteEvents,
  getNextWeekEvents,
  deleteEventById,
  updateEvent,
  getGroupEvents,
  getEverythingWithAccessOf,
  getEventParticipants,
  getEventsByDate,
  getEventDates,
} from '../../database/dbHandler.js';
import { checkToken } from '../middleware/jwtCheck.js'; 
import camelCasify from '../util/camelCasify.js'
import userDTO from '../util/userDTO.js';
import prevImpersonation from '../middleware/prevImpersonation.js';

const router = express.Router();

const eventDTO = (data) => {
  const dto = {};
  const {
    event_id,
    accessibility_id,
    accessibility,
    group_id,
    type_id,
    name,
    address,
    start_date
  } = data;
  
  dto.eventId = event_id;
  dto.accessibilityId = accessibility_id;
  dto.groupId = group_id;
  dto.typeId = type_id;
  dto.name = name;
  dto.address = address;
  dto.startDate = start_date;
  if (accessibility) {
    dto.accessibility = accessibility.accessibility_name;
  }

  return dto;
}

router.post('/', checkToken, prevImpersonation, async (req, res) => {
  const data = req.body;
  data.user_id = res.locals.tokenObject.userId;
  try {
    // Inserting into database
    const result = await createEvent(data);
    
    res.status(201);
    res.json({created: true, id: result});
  } catch (error) {
    res.status(400);
    res.json({created: false, message: `${error}\nPlease try again later`});
  }
});

router.post('/:id/invite', checkToken, async (req, res) => {
  try {
    const result = await inviteUserToEvent(req.params.id, req.body);
    
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.post('/:id/remove', checkToken, async (req, res) => {
  try {
    const result = await removeUserFromEvent(req.params.id, req.body.user_id);
    
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.post('/:id/join', checkToken, async (req, res) => {
  try {
    const isMemeber = await userIsMemberOfEvent(req.params.id, req.body.user_id);

    if (!isMemeber) {
      try {
        const result = await joinUserIntoEvent(req.params.id, req.body.user_id);

        res.json(result);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/leave', checkToken, async (req, res) => {
  try {
    const result = await removeUserFromEvent(req.params.id, req.body.user_id);

    res.json(result);
  } catch (error) {

  }
});

router.get('/', async (req, res) => {
  const groupId = req.query.groupId;
  try {
    let result;
    if (!groupId) {
      result = await getEverythingWithAccessOf('events');
    } else {
      result = await getGroupEvents(groupId);
    }
    
    result.forEach((element, index, array) => {
      array[index] = eventDTO(element);
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

router.get('/actual', async (req, res) => {
  try {
    const result = await getEventsByDate(req.query.date);
    
    result.forEach((element, index, array) => {
      array[index] = eventDTO(element);
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

router.get('/lastMinute', async (req, res) => {
  try {
    const date = new Date(`${req.query.date} UTC-0:00`);
    const result = await getLastMinuteEvents(date);
    result.forEach((element, index, array) => {
      array[index] = eventDTO(element);
    });
    
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({});
  }
});

router.get('/nextWeek', async (req, res) => {
  try {
    const date = new Date(`${req.query.date} UTC-0:00`);
    const result = await getNextWeekEvents(date);
    result.forEach((element, index, array) => {
      array[index] = eventDTO(element);
    });
    
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({});
  }
});

router.get('/dates', async (req, res) => {
  try {
    const result = await getEventDates();

    result.forEach((element, index, array) => {
      array[index] = element.start_date.split('T')[0];
    });

    const uniqeResult = [...new Set(result)];

    res.status(200);
    res.json(uniqeResult);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({});
  } 
});

router.get('/:id', checkToken, async (req, res) => {
  try {
    const result = await getEventById(req.params.id);
    result[0].type = result[0].type.type_name;
    res.status(200);
    res.send(camelCasify(result[0]));
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.get('/:id/users', async (req, res) => {
  try {
    const eventId = req.params.id;

    const result = await getEventParticipants(eventId);
    result.forEach((element, index, array) => {
      array[index] = userDTO(element);
    });

    res.status(200);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({});
  }
});

router.get('/:id/member', checkToken, async (req, res) => {
  try {
    const result = await userIsMemberOfEvent(req.params.id, req.query.userId);

    if (result.length) {
      res.status(200);
      res.json({
        isMember: true,
        message: 'The user is member of the event'
      })
    } else {
      res.status(200);
      res.json({
        isMember: false,
        message: 'The user is NOT member of the event'
      })
    }
  } catch (error) {
    console.log(error);
    
    res.status(403);
    res.json({
      message: 'Please log in'
    })
  }
});

router.delete('/:id', checkToken, async (req, res) => {
  try {
    const result = await deleteEventById(req.params.id);
    if (result) {
      res.status(200);
      res.json({result: 'Delete successful'});

      return;
    }

    res.status(400);
    res.json({result: 'Delete failed'})
  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Delete failed'});
  }
});

router.patch('/:id', checkToken, async (req, res) => {
  try {
    const data = {
      id: req.params.id,
      eventData: req.body
    }
    const result = await updateEvent(data);

    if (result[0]) {
      res.status(200);
      res.json({result: 'Update is successful', created: true, id: req.params.id});
      
      return;
    }

    res.status(400);
    res.json({result: 'Update failed', created: false});
  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Update failed',  created: false});
  }
});

export default router;
