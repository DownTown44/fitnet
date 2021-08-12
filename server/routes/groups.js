import express from 'express';
import seq from 'sequelize';
import multer from 'multer';
import path from 'path';

import { createGroups } from '../../database/dbHandler.js';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'server/assets/groupImages');

const imageStorage = multer.diskStorage({
  // Destination to the upload directory
  destination: uploadDir,
  // Change the filename for unique name by date
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    // Upload only png, jpg, jpeg format
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // If the extention does not match than set the fileValidationError field
      req.fileValidationError = 'Forbidden extension';
      return cb(null, false, req.fileValidationError);
    }
    cb(undefined, true);
  }
}) 

router.post('/', imageUpload.single('image'), async (req, res) => {
  // If the fileValidationError field set, than send "400 bad request"
  if (req.fileValidationError) {
    res.status(400);
    res.send('Forbidden file format');
  }

  const fileHandler = req.file;
  const data = JSON.parse(req.body.data);
  data.picture = path.join('groupImages', fileHandler.filename);
  
  try {
    // Inserting into database
    await createGroups(data);

    res.status(201);
    res.send();
  } catch (error) {
    console.log(error);

    res.status(400);
    res.send(`${error}\nPlease try again later`);
  }
});

export default router;
