const deleteUserFromEvent = async (data, model, errMessage) => {
  try {
    const result = await model.destroy({
      where: {
        user_id: data.user_id,
        event_id: data.event_id
      }
    });

    return {success: true, message: "User removed successfully"};
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
};

export default deleteUserFromEvent;
