import express from 'express';
import { userRegister, userLogin } from '../controllers/userController.js';
import { addSiswa } from '../controllers/siswaController.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({ status: 'OK' });
});


router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.post('/siswa/add', addSiswa)

export default router;