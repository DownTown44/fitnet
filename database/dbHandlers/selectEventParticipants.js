import event_members from '../models/event_members.js';

const selectEventParticipants = async (model, eventId, errMessage) => {
  try {
    const result = await model.findAll({
      include: [
        {
          model: event_members,
          as: 'event_members',
          where: {
            event_id: eventId,
          }
        }
      ]
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectEventParticipants;
