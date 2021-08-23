const insertGroup = async (data, model, errMessage) => {
  try {
    const groupInsertObject = await model.build(data);
    const result = await groupInsertObject.save();
    
    return result.dataValues.group_id;
  } catch (error) {
    console.log(error);
    throw errMessage;
  }
};

export default insertGroup;
