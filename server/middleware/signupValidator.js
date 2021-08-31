import validator from 'validator';

const checkName = (name) => {
  if (validator.isAlpha(name, 'hu-HU')) {
    return true;
  }

  return false;
}

const checkEmail = (email) => {
  if (validator.isEmail(email)) {
    return true;
  }

  return false;
}

const checkPhoneNumber = (phoneNumber) => {
  if (validator.isMobilePhone(phoneNumber, 'ro-RO')) {
    return true;
  }

  return false;
}

const checkPwd = (pwd) => {
  if (validator.isStrongPassword(pwd, {minSymbols: 0})) {
    return true;
  }

  return false;
}

const checkEquality = (pwd, repeatedPwd) => {
  if (validator.equals(repeatedPwd, pwd)) {
    return true;
  }

  return false;
}

const validateAll = (data) => {
  const {
    email,
    first_name,
    last_name,
    phone_number,
    password,
    repeated_password,
  } = data;

  if (checkEmail(email) &&
      checkName(first_name) &&
      checkName(last_name) &&
      checkPhoneNumber(phone_number) &&
      checkPwd(password) &&
      checkEquality(password, repeated_password)) {
    return true;
  }

  return false;
}

const signupValidator = (req, res, next) => {

  if (!validateAll(req.body)) {
    res.status(400);
    res.json({message: 'One of the following datas is not valid'});
    
    return;
  }

  next();
}

export default signupValidator;