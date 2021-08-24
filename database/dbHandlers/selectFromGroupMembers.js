const selectFromGroupMembers = async (model, data, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        user_id: data.userId,
        group_id: data.groupId
      }
    });

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectFromGroupMembers;
