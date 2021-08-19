import express from 'express';

import { createEvent, getEverythingOf } from '../../database/dbHandler.js';

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

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    // Inserting into database
    await createEvent(data);

    res.status(201);
    res.json({created: true});
  } catch (error) {
    res.status(400);
    res.json({created: false, message: `${error}\nPlease try again later`});
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

export default router;
