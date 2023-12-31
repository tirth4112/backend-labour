const express = require('express');

const Auth_Login=require('../../controllers/Admin_Login_Controller')


const router = express.Router();

// router.post('/Admin-Registration',middleware_Admin.CheckAdmin, Auth_Registration.Registeration);
router.get('/Admin-Login', Auth_Login.Admin_Login_Controller);
// router.post('/Admin-ForgetPassword', Admin_ForgetPassword.Admin_ForgetPassword);

module.exports = router;