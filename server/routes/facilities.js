import express from 'express';

import { getEverythingOf } from '../../database/dbHandler.js';

const router = express.Router();

const facilityDTO = (data) => {
  const dto = {};
  const {
    facility_id,
    active,
    user_id,
    name,
    address
  } = data;

  dto.facilityId = facility_id;
  dto.active = active;
  dto.userId = user_id;
  dto.name = name;
  dto.address = address;

  return dto;
}

router.get('/', async (req, res) => {
  try {
    const result = await getEverythingOf('facilities');
    result.forEach((element, index, array) => {
      array[index] = facilityDTO(element);
    });

    res.json(result)
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

export default router;
