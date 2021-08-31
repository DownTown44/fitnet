import express from 'express';

import { 
  createEvent,
  inviteUserToEvent,
  removeUserFromEvent,
  userIsMemberOfEvent,
  joinUserIntoEvent,
  getEventById,
  getEverythingOf,
  getLastMinuteEvents,
  getNextWeekEvents,
  deleteEventById,
  updateEvent,
} from '../../database/dbHandler.js';
import camelCasify from '../util/camelCasify.js'
import { checkToken } from '../middleware/jwtCheck.js'; 

const router = express.Router();

const eventDTO = (data) => {
  const dto = {};
  const {
    event_id,
    accessibility_id,
    type_id,
    owner_id,
    name,
    address,
    start_date
  } = data;
  
  dto.eventId = event_id;
  dto.accessibilityId = accessibility_id;
  dto.typeId = type_id;
  dto.ownerId = owner_id;
  dto.name = name;
  dto.address = address;
  dto.startDate = start_date;
  
  return dto;
}

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

router.post('/', async (req, res) => {
  const data = req.body;
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

router.post('/:id/invite', async (req, res) => {
  try {
    const result = await inviteUserToEvent(req.params.id, req.body);

    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.post('/:id/remove', async (req, res) => {
  try {
    const result = await removeUserFromEvent(req.params.id, req.body.user_id);

    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getEverythingOf('events');
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

router.get('/:id', async (req, res) => {
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

router.get('/:id/member', async (req, res) => {
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

// TODO: Check if the user is already a group participant
router.post('/:id/join', async (req, res) => {
  try {
    const result = await joinUserIntoEvent(req.params.id, req.body.user_id);

    res.json(result);
  } catch (error) {

  }
});

router.post('/:id/leave', async (req, res) => {
  try {
    const result = await removeUserFromEvent(req.params.id, req.body.user_id);

    res.json(result);
  } catch (error) {

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
