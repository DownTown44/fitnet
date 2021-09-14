function checkIdAuthority(req, res, next) {
  if (req.body && (req.body.userId === res.locals.tokenObject.userId)) {
    next();
    return;
  }

  res.status(403);
  res.json({
    message: 'You have no permission for this operation'
  });
}

export default checkIdAuthority;
