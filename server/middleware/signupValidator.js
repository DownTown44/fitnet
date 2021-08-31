import validator from 'validator';

const validateInput = (data) => {
  const {
    email,
    first_name,
    last_name,
    phone_number,
    password,
    repeated_password,
  } = data;

  if (!validator.isEmail(email) ||
  !validator.isAlpha(first_name, 'hu-HU') ||
  !validator.isAlpha(last_name, 'hu-HU') ||
  !validator.isMobilePhone(phone_number, 'ro-RO') ||
  !validator.isStrongPassword(password, {minSymbols: 0}) ||
  !validator.equals(repeated_password, password)) {
    return false;
  }

  return true;
}

const signupValidator = (req, res, next) => {

  if (!validateInput(req.body)) {
    res.status(400);
    res.json({message: 'One of the following datas is not valid'});
    
    return;
  }

  next();
}

export default signupValidator;