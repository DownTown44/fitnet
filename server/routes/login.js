import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import secret from '../secret/secret.js'
import { getUserByEmail } from '../../database/dbHandler.js';

const router = express.Router();

const userToDTO = (user) => {
  const dto = {};
  const { user_id, first_name, last_name, email, phone_number, role } = user;
  const roleName = role.role_name;

  dto.userId = user_id;
  dto.firstName = first_name;
  dto.lastName = last_name;
  dto.email = email;
  dto.phoneNumber = phone_number;
  dto.role = roleName;

  return dto;
}

router.post('/', async (req, res) => {
  const data = req.body;

  try {
    // Check if the email is registered in the database
    const user = (await getUserByEmail(data))[0];

    // If the user isn't registered, or the given password is incorrect
    if (!user || !await bcrypt.compare(data.password, user.password)) {
      res.status(401);
      res.json({
        auth: false,
        message: 'The email, or password was incorrect'
      });
      return;
    }
    
    // If the login was succesful then sign a jwt for the user
    const token = jwt.sign({
      email: user.email,
      userId: user.user_id,
      role: user.role.role_name,
    }, secret, {
      expiresIn: '48h',
    });
    
    // Store the jwt in a cookie named 'token'
    // httpOnly -> prevents XSS jwt stealing
    // sameSite -> almost the same as above
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    const dto = userToDTO(user);

    res.status(200);
    res.json({
      auth: true,
      token: token,
      result: dto,
    });
  } catch (error) {
    console.log(error);

    res.status(500);
    res.json({
      auth: false,
      message: error
    });
  }
});

export default router;
