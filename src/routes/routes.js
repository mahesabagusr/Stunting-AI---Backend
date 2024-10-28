import express from 'express';
// import { userRegister, userLogin } from '../module/User/controllers/user_controller.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({ status: 'OK' });
});


// router.post('/user/register', userRegister);
// router.post('/user/login', userLogin);

export default router;