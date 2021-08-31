import express from 'express';
import multer from 'multer';
import path from 'path';

import snakeCasify from '../util/snakeCasify.js';
import camelCasify from '../util/camelCasify.js';

import {
  createGroup,
  getGroupById,
  getEverythingWithAccessOf,
  inviteUserToGroup,
  removeUserFromGroup,
  joinUserIntoGroup,
  userIsMemberOfGroup,
  deleteGroupById,
  updateGroup
} from '../../database/dbHandler.js';
import { checkToken } from '../middleware/jwtCheck.js';

const router = express.Router();

const groupDTO = (data) => {
  const dto = {};
  const {
    user_id,
    group_id,
    accessibility_id,
    name,
    accessibility
  } = data;
  
  dto.userId = user_id;
  dto.groupId = group_id;
  dto.accessibilityId = accessibility_id;
  dto.name = name;
  dto.accessibility = accessibility.accessibility_name;

  return dto;
}

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
    if (!file.mimetype.match(/(png|jpg|jpeg)$/)) {
      // If the extention does not match than set the fileValidationError field
      req.fileValidationError = 'Forbidden extension';
      return cb(null, false, req.fileValidationError);
    }
    cb(undefined, true);
  }
}) 

router.post('/', checkToken, imageUpload.single('image'), async (req, res) => {
  // If the fileValidationError field set, than send "400 bad request"
  if (req.fileValidationError) {
    res.status(400);
    res.send('Forbidden file format');
    return;
  }

  const fileHandler = req.file;
  const data = snakeCasify(JSON.parse(req.body.data));
  data.picture = path.join('groupImages', fileHandler.filename);
  
  try {
    // Inserting into database
    const result = await createGroup(data);
    
    res.status(201);
    res.json({created: true, id: result});
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json({created: true, message: `${error}\nPlease try again later`});
  }
});

router.post('/:id/invite', async (req, res) => {
  try {
    const result = await inviteUserToGroup(req.params.id, req.body);

    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.post('/:id/remove', async (req, res) => {
  try {
    const result = await removeUserFromGroup(req.params.id, req.body.user_id);

    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

// TODO: Check if the user is already a group participant
router.post('/:id/join', checkToken, async (req, res) => {
  try {
    const result = await joinUserIntoGroup(req.params.id, req.body.user_id);

    res.json(result);
  } catch (error) {

  }
});

router.post('/:id/leave', async (req, res) => {
  try {
    const result = await removeUserFromGroup(req.params.id, req.body.user_id);

    res.json(result);
  } catch (error) {

  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getEverythingWithAccessOf('groups');
    result.forEach((element, index, array) => {
      array[index] = groupDTO(element);
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getGroupById(req.params.id);

    res.status(200);
    res.send(camelCasify(result[0]));
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

router.get('/:id/member', async (req, res) => {
  try {
    const result = await userIsMemberOfGroup(req.params.id, req.query.userId);

    if (result.length) {
      res.status(200);
      res.json({
        isMember: true,
        message: 'The user is member of the group'
      })
    } else {
      res.status(200);
      res.json({
        isMember: false,
        message: 'The user is NOT member of the group'
      })
    }
  } catch (error) {
    console.log(error);

    res.status(403);
    res.json({
      message: 'Please log in'
    })
  }
});

router.delete('/:id', checkToken, async (req, res) => {
  try {
    const result = await deleteGroupById(req.params.id);
    if (result) {
      res.status(200);
      res.json({result: 'Delete successful'});

      return;
    }

    res.status(400);
    res.json({result: 'Delete unsuccessful'})
  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Delete unsuccessful'});
  }
});

router.patch('/:id', checkToken, imageUpload.single('image'), async (req, res) => {
  if (req.fileValidationError) {
    res.status(400);
    res.send('Forbidden file format');
    return;
  }
  
  let data = req.body.data
  data = snakeCasify(JSON.parse(req.body.data));
  const fileHandler = req.file;

  // Check if new picture added
  if (fileHandler !== undefined) {
    data.picture = path.join('groupImages', fileHandler.filename);
  }

  try {
    const groupData = {
      id: req.params.id,
      groupData: data
    }
    const result = await updateGroup(groupData);

    if (result[0]) {
      res.status(200);
      res.json({result: 'Update is successful', created: true, id: req.params.id})

      return;
    }

    res.status(400);
    res.json({result: 'Update is unsuccessful', created: false});
  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Update unsuccessful',  created: false});
  }
});

export default router;
