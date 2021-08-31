import fs from 'fs';

const prevImpersonation = (req, res, next) => {
  // If the request multipart formdata
  if (req.body.data && JSON.parse(req.body.data).userId) {
    fs.unlinkSync(req.file.path);

    res.status(403);
    res.json({
      message: 'Permission denied',
    });

    return;
  // Else if the requset is normal req
  } else if (req.body.user_id) {
    res.status(403);
    res.json({
      message: 'Permission denied',
    });

    return;
  }

  next();
}

export default prevImpersonation
