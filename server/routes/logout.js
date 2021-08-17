import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('token');
  res.status(200);
  res.json({
    logout: true,
    message: 'Logut successful',
  });
});

export default router;
