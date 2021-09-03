const selectAll = async (model, errMessage) => {
  try {
    const result = await model.findAll();

    return JSON.stringify(result);

  } catch (error) {
    console.log(error);
    throw errMessage;
  }
}

export default selectAll;
