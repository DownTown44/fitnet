const insertEvent = async (data, model, errMessage) => {
  try {
    const eventInsertObject = await model.build(data);
    const result = await eventInsertObject.save();

    return result;
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
};

export default insertEvent;
