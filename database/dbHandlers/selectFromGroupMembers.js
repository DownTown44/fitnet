const selectFromGroupMembers = async (model, data, errMessage) => {
  try {
    const result = await model.findOne({
      where: {
        user_id: data.user_id,
        group_id: data.group_id
      }
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectFromGroupMembers;
