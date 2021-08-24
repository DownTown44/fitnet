import group_members from '../models/group_members.js'

const selectGroupParticipants = async (model, groupId, errMessage) => {
  try {
    const result = await model.findAll({
      include: [
        {
          model: group_members,
          as: 'group_members',
          where: {
            group_id: groupId,
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

export default selectGroupParticipants;
