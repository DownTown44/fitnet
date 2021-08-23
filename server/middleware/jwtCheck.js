import jwt from 'jsonwebtoken';
import secret from '../secret/secret.js';

// Middleaware to decode the jwt token saved in cookies
export function  decodeToken(req, res, next) {
  const r = res;
  // If the toke cookie exists, then verify it
  // If not then let trough the request
  if (req.cookies.token) {
    try {
      // If the jwt is valid then save it in the req.locals
      const tokenObject = jwt.verify(req.cookies.token, secret);
      r.locals.tokenObject = tokenObject;
    } catch (err) {
      // If the jwt is not valid then clear the cookie named 'token'
      res.clearCookie('token');
    }
  }

  next();
}

// Middleware that checks the req.locals for the verified token
// This middleware is used for check the authoriti of the users
export function checkToken(req, res, next) {
  if (res.locals.tokenObject) {
    next();
    return;
  }
  
  res.status(403);
  res.json({
    auth: false,
    message: 'Please signin'
  });
}
