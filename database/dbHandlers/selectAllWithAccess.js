import accessibilities from '../models/accessibilities.js';

const selectAllWithAccess = async (model, errMessage) => {
  try {
    const result = await model.findAll({
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

export default selectAllWithAccess;

