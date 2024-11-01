import express from 'express';
import { userRegister, userLogin } from '../controllers/userController.js';
import { addSiswa, getAllHistorySiswa, getStuntingCount, updateSiswa } from '../controllers/siswaController.js';
import { verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({ status: 'OK' });
});


router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.post('/siswa/add', verifyToken, addSiswa)
router.post('/siswa/update', verifyToken, updateSiswa);
router.get('/siswa/stunting/count', verifyToken, getStuntingCount)
router.get('/siswa/response/history', verifyToken, getAllHistorySiswa)

export default router;