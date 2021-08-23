const jsonBodyDataParser = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  next();
}

export default jsonBodyDataParser;
