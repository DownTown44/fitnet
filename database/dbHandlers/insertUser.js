const insertUser = async (data, model, errMessage) => {
  try {
    const userInsertObject = await model.build(data);
    const result = await userInsertObject.save();

    return {success: true, message: "User inserted successfully"};
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default insertUser;
