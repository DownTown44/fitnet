const deleteUserFromGroup = async (data, model, errMessage) => {
  try {
    const result = await model.destroy({
      where: {
        user_id: data.user_id,
        group_id: data.group_id
      }
    });

    return {success: true, message: "User removed successfully"};
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
};

export default deleteUserFromGroup;
