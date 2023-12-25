const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDetail = require('../../../api-gateway/Model/Auth_User_Master/Userdetail-Admin.cjs');
const LoginLog = require('../../../api-gateway/Model/Auth_User_Transication/Login_logs_Admin.cjs');
const FalseLoginLog = require('../../../api-gateway/Model/Auth_User_Transication/False_Request_Admin.cjs');
const queueNames = require('../../../api-gateway/Rabbitmq/Queue.json');
const  publishToQueue =  require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');

exports.Admin_Login_Controller = async (req, res) => {
  try {
    const { Contact, password } = req.body;

    // Check if Contact or password is undefined
    if (Contact === undefined || password === undefined) {
      res.status(400).json({ message: 'Empty Field' });
      return;
    }

    // Find user by Contact
    const user = await UserDetail.findOne({ Contact });

    if (!user) {
      // Log false login attempt with the user's ID
      await logFalseLoginAttempt(user._id);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Log false login attempt with the user's ID
      await logFalseLoginAttempt(user._id);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Log successful login
    await logSuccessfulLogin(user._id);

    // Generate and send JWT
    // const accessToken = generateAccessToken(user._id, user.fname);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function logFalseLoginAttempt(userId) {
  try {
    const currentTimestamp = new Date().getTime();
    const timeThreshold = 10 * 60 * 1000; // 10 minutes

    // Retrieve the failed login attempts within the time frame
    const failedLoginAttempts = await FalseLoginLog.find({
      userId,
      timestamp: { $gte: currentTimestamp - timeThreshold },
    });

    if (failedLoginAttempts.length >= 3) {
      // Decline the request if failed attempts exceed the limit within 10 minutes
      throw new Error('Too many failed login attempts. Please try again later.');
    }

const queues = queueNames.Auth_user.Admin_Login;
// console.log(queues.Admin_Reg);
  await publishToQueue(queues.Admin_False_Log, JSON.stringify(userId));






    // If not exceeding the limit, create a new log
    // await FalseLoginLog.create({
    //   userId,
    //   timestamp: new Date(),
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // handle error appropriately
  }
}



function generateRefreshToken(userId) {
  const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
}

async function logSuccessfulLogin(username) {
  try {

  const queues = queueNames.Auth_user.Admin_Login;
// console.log(queues.Admin_Reg);
  await publishToQueue(queues.Admin_Successful_Log, JSON.stringify(username));
  // res.status(200).json({ message: 'Registration successful' });
} 
catch (error) {
  // console.error('Error during registration:', error.message);
  res.status(500).json({ error: error});
}








  // try {
  //   await LoginLog.create({
  //     username,
  //     timestamp: new Date(),
  //     success: true,
  //   });
  // } catch (error) {
  //   // console.error('Error logging successful login:', error);
  //   res.status(500).json({ error: error});

  // }
}
