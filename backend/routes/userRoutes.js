const express = require('express');
const {
    registerUser,
    loginUser,
    updateUserProfile,
    changePassword,
    getUserDetails,
    requestPasswordReset,
    resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);
router.get('/profile', protect, getUserDetails);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);


module.exports = router;
