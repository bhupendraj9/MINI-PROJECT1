const express = require('express');
const router = express.Router();

const {mailConfirmation,sendotp,resendOtp,SignUp} = require('../controllers/common/auth/Sign');
const { Login } = require('../controllers/common/auth/Login');
const {auth,isStudent,isAdmin,isRecruiter} = require('../middlewares/auth');

 const { resetPassword } = require('../controllers/common/resetPassword');
 const { resetToken } = require('../controllers/common/resetToken');

const { UserDetails } = require('../controllers/common/UserDetails');
router.get('/',()=>{console.log("routes are fine")})

//*auth routes
router.post('/verifyemail',mailConfirmation);
router.post('/sendotp',sendotp)
router.post('/resendotp',resendOtp);
router.post('/signup',SignUp);
router.post('/login',Login);

//*reset password
router.post('/resetToken',resetToken)
router.post('/change-password',resetPassword)


module.exports = router;

