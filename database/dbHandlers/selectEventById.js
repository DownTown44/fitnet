import seq from 'sequelize';
import eventTypes from '../models/event_types.js';

const selectEventById = async (model, id, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        event_id: {
          [seq.Op.eq] : id
        }
      },
      include: [
        {
          model: eventTypes,
          as: 'type'
        }
      ]
    });
    
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectEventById;
