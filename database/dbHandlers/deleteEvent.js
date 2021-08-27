const deleteEvent = async (id, model, errMessage) => {
  try {
    const result = await model.destroy({
      where: {
        event_id: id,
      }
    });

    return result;
  } catch (err) {
    console.log(err);
    throw errMessage;
  }
}

export default deleteEvent;
