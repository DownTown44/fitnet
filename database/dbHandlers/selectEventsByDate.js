import seq from 'sequelize';
import accessibilities from '../models/accessibilities.js';

const selectEventsByDate = async (model, date, errMessage) => {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(startDate.getDate() + 1);
  try {
    const result = await model.findAll({
      where: {
        [seq.Op.and]: [
          {
            start_date: {
              [seq.Op.gt]: date,
            },
          },
          {
            end_date: {
              [seq.Op.lt]: endDate,
            },
          },
        ]
      },
      include: [
        {
          model: accessibilities,
          as: 'accessibility',
        }
      ],
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectEventsByDate;
