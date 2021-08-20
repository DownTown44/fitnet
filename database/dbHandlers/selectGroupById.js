import seq from 'sequelize';

const selectGroupById = async (model, id, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        group_id: {
          [seq.Op.eq] : id
        }
      }
    });
    
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectGroupById;
