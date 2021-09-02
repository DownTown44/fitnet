import seq from 'sequelize';

const selectFieldsByFacilityId = async (model, id, errMessage) => {
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

export default selectFieldsByFacilityId;
