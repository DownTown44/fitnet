const selectGroupMemberByGroupId = async (model, groupId, errMessage) => {
  try {
    const result = await model.findAll({
      where: {
        group_id: groupId
      }
    });

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectGroupMemberByGroupId;
