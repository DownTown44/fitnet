import express from 'express';
import multer from 'multer';
import path from 'path';

import snakeCasify from '../util/snakeCasify.js';
import camelCasify from '../util/camelCasify.js';

import {
  createGroup,
  getGroupById,
  getDetailedGroupsData,
  getGroupMemberByGroupId,
  inviteUserToGroup,
  removeUserFromGroup,
  joinUserIntoGroup,
  userIsMemberOfGroup,
  deleteGroupById,
  updateGroup,
  getGroupParticipants,
} from '../../database/dbHandler.js';
import { checkToken } from '../middleware/jwtCheck.js';
import userDTO from '../util/userDTO.js';
import prevImpersonation from '../middleware/prevImpersonation.js';
import fs from 'fs';

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

router.post('/', checkToken, imageUpload.single('image'), prevImpersonation, async (req, res) => {
  // If the fileValidationError field set, than send "400 bad request"
  if (req.fileValidationError) {
    res.status(400);
    res.send('Forbidden file format');
    return;
  }

  const fileHandler = req.file;
  const data = snakeCasify(JSON.parse(req.body.data));
  data.user_id = res.locals.tokenObject.userId;
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

router.post('/:id/join', checkToken, async (req, res) => {
  try {
    const isMember = await userIsMemberOfGroup(req.params.id, req.body.user_id);
    if (!isMember) {
      const result = await joinUserIntoGroup(req.params.id, req.body.user_id);
      res.json(result);
    } else {
      res.json({});
    }
  } catch (error) {
    res.json({});
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
    const result = await getDetailedGroupsData();
    result.forEach((element, index, array) => {
      array[index] = groupDTO(element);
    }); 

    // Connecting group members to groups
    for (const element of result) {
      const members = await getGroupMemberByGroupId(element.groupId);
      element.members = members;
    }

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

router.get('/:id/users', async (req, res) => {
  try {
    const groupId = req.params.id;

    const result = await getGroupParticipants(groupId);
    result.forEach((element, index, array) => {
      array[index] = userDTO(element);
    });

    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({});
  }
});

router.get('/:id/member', async (req, res) => {
  try {
    const result = await userIsMemberOfGroup(req.params.id, req.query.userId);

    if (result) {
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
    const groupResult = await getGroupById(req.params.id);
    await fs.unlinkSync(path.join(process.cwd(), `server/assets/${groupResult[0].picture}`));
    
    const result = await deleteGroupById(req.params.id);
    if (result) {
      res.status(200);
      res.json({result: 'Delete successful'});

      return;
    }

    res.status(400);
    res.json({result: 'Delete failed'})
  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Delete failed'});
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
    await updateGroup(groupData);

    res.status(200);
    res.json({result: 'Update is successful', created: true, id: req.params.id})

  } catch (error) {
    res.status(500);
    res.json({result: 'Server error. Update failed',  created: false});
  }
});

export default router;
