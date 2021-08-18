const transformConvention = (keyName) => {
  keyName = keyName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return keyName;
}

const snakeCasify = (object) => {
  const newReqBody = {};
  for (const key in object) {
    newReqBody[transformConvention(key)] = object[key];
  }
  return newReqBody;
}

export default snakeCasify;
