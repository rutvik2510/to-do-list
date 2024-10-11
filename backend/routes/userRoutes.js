const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, updateById, getalluser, ChangePassword } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer')
router.post('/register', upload.single("profilepic"), registerUser);
router.post('/login', loginUser);
router.get('/getUserById/:id', authMiddleware, getUserById);
router.get('/getalluser', authMiddleware, getalluser);
router.put('/updatebyid', authMiddleware, upload.single('profilepic'), updateById);
router.put('/ChangePassword', authMiddleware, ChangePassword);


module.exports = router;