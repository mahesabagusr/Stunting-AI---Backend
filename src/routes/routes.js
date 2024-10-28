import express from 'express';
import { userRegister } from '../controllers/userController.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({ status: 'OK' });
});


router.post('/user/register', userRegister);
// router.post('/user/login', userLogin);

export default router;