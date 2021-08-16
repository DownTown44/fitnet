const transformConvention = (keyName) => {
  keyName = keyName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return keyName;
}

const snakeCasify = (req, res, next) => {
  const newReqBody = {};
  for (const key in req.body) {
    newReqBody[transformConvention(key)] = req.body[key];
  }
  req.body = newReqBody;
  next();
}

export default snakeCasify;
