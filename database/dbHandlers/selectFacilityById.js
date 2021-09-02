import seq from 'sequelize';

const selectFacilityById = async (model, id, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        facility_id: {
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

export default selectFacilityById;
