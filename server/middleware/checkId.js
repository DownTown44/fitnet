function checkIdAuthority(req, res, next) {
  // TODO: Must be solve the auth problem, wrong order
  // The userId must be equal with the token userId
  // Because right now impersonating is possible :/
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
