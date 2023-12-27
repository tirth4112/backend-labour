const express = require('express');

const middleware_Admin = require('../../../../api-gateway/middleware/Check_Admin.cjs');
const Auth_Registration=require('../..//controllers/Admin_Registration_Controller')
const Auth_Login=require('../../controllers/Admin_Login_Controller')
const Admin_ForgetPassword=require('../../controllers/Admin_ForgetPassword')


const router = express.Router();

router.post('/Admin-Registration',middleware_Admin.CheckAdmin, Auth_Registration.Registeration);
router.post('/Admin-Login', Auth_Login.Admin_Login_Controller);
router.post('/Admin-ForgetPassword', Admin_ForgetPassword.Admin_ForgetPassword);

module.exports = router;