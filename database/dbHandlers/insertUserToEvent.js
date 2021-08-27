const insertUserToEvent = async (data, model, errMessage) => {
  try {
    const eventMemberInsertObject = await model.build(data);
    const result = await eventMemberInsertObject.save();

    return {succes: true, message: "User invitation successful"};
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
};

export default insertUserToEvent;
