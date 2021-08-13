import seq from 'sequelize';

const selectUserByEmail = async (model, email, errMessage) => {
  try {
    // Find all records in the database where email field is exact the same as the given email
    const result = await model.findAll({
      where: {
        email: {
          [seq.Op.eq] : email
        }
      }
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectUserByEmail;
