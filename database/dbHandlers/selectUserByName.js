import seq from 'sequelize';

const selectUserByName = async (model, searchString, errMessage) => {
  try {
    const result = await model.findAll({
      where: seq.where(seq.fn('concat', seq.col('last_name'), ' ', seq.col('first_name')), {
        [seq.Op.like]: `%${searchString}%`
      })
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectUserByName;
