const selectFromEventMembers = async (model, data, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        user_id: data.user_id,
        event_id: data.event_id
      }
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectFromEventMembers;
