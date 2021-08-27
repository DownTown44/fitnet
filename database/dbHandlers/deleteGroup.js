const deleteGroup = async (id, model, errMessage) => {
  try {
    const result = await model.destroy({
      where: {
        group_id: id,
      }
    });

    return result;
  } catch (err) {
    console.log(err);
    throw errMessage;
  }
}

export default deleteGroup;
