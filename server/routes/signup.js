import express from 'express';
import bcrypt from 'bcrypt';

import { registerUser } from '../../database/dbHandler.js';
import { getUserByEmail } from '../../database/dbHandler.js';
import signupValidator from '../middleware/signupValidator.js';

const router = express.Router();

router.post('/', signupValidator, async (req, res) => {
  const data = req.body;
  
  try {
    // Check if the user was regitered before with the given email
    const user = (await getUserByEmail(data))[0];

    if (user) {
      res.status(400);
      res.send('This email address is registered already');
      return;
    }

    const { password } = data;
    // Password hashing and updating the insertion data
    data.password = bcrypt.hashSync(password, 10);
    
    try {
      await registerUser(data);

      res.status(201);
      res.send();
    } catch (error) {
      console.log(error);

      res.status(400);
      res.send(`${error}\nPlease try again later`);
    }
  } catch(error) {
    console.log(error);

    res.status(500);
    res.send(error);
  }
});

export default router;
