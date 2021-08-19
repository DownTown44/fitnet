const camelCasify = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key.replace(/(\_\w)/g, (dashLatter) => {
        return dashLatter[1].toUpperCase();
      })] = obj[key];
    }
  }
  return newObj;
}

export default camelCasify;