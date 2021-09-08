const selectGroupEvents = async (model, id, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        group_id: id,
      }
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectGroupEvents;
