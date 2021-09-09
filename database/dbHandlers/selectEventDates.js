import seq from 'sequelize';

const selectEventDates = async (model, errMessage) => {
  try {
    const result = await model.findAll({
      attributes: ['start_date']
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectEventDates;