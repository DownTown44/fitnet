import seq from 'sequelize';

const selectNextWeekEvents = async (model, date, errMessage) => {
  const lmStartDate = date;
  const lmEndDate = new Date(date);
  lmEndDate.setDate(date.getDate() + 7);
  try {
    const result = await model.findAll({
      where: {
        [seq.Op.and]: [
          {
            start_date: {
              [seq.Op.gt]: lmStartDate,
            },
          },
          {
            end_date: {
              [seq.Op.lt]: lmEndDate,
            },
          },
        ]
      }
    });

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectNextWeekEvents;
