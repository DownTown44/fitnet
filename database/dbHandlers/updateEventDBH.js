const updateEventDBH = async (model, data) => {
  try {
    const result = await model.update({
      accessibility_id: data.eventData.accessibility_id,
      name: data.eventData.name,
      description: data.eventData.description,
      address: data.eventData.address,
      min_participant: data.eventData.min_participant,
      max_participant: data.eventData.max_participant,
      repeat: data.eventData.repeat,
      start_date: data.eventData.start_date,
      end_date: data.eventData.end_date
    }, {
      where: {
        event_id: data.id,
      },
    });

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    throw 'SQL exception: Database error';
  }
}

export default updateEventDBH;
