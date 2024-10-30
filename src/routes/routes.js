import express from 'express';
import { userRegister, userLogin } from '../controllers/userController.js';
import { addSiswa, updateSiswa } from '../controllers/siswaController.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({ status: 'OK' });
});


router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.post('/siswa/add', addSiswa)
router.post('/siswa/update', updateSiswa);
export default router;