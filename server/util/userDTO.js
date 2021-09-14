const userDTO = (data) => {
  const dto = {};
  const {
    user_id,
    first_name,
    last_name
  } = data;
  
  dto.userId = user_id;
  dto.firstName = first_name;
  dto.lastName = last_name;
  
  return dto;
}

export default userDTO;