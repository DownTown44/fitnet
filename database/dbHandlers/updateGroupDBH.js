const updateGroupDBH = async (model, data) => {
  try {
    const result = await model.update({
      accessibility_id: data.groupData.accessibility_id,
      name: data.groupData.name,
      description: data.groupData.description,
      picture: data.groupData.picture
    }, {
      where: {
        group_id: data.id,
      },
    });

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw 'SQL exception: Database error';
  }
}

export default updateGroupDBH;
