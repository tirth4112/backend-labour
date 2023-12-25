const ConnectionStart = require('../../../api-gateway/ConnectionStart.cjs');
const Auth_User = require('../../../api-gateway/config/Auth_User_Master.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queueNames = require('../../../api-gateway/Rabbitmq/Queue.json');
const publishToQueue = require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');
const Auth_User_Transication = require('../../../api-gateway/config/Auth_User_Transication.cjs');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');


exports.Admin_Login_Controller = async (req, res) => {
  try {
    const { Contact, password } = req.query;
    console.log(Contact)
    // Check if Contact or password is undefined
    if (Contact === '' || password === '') {

      return res.status(400).json({ message: 'Empty Field' });;
    }

    // Creating initial connection 
    const collection = await ConnectionStart(Auth_User, 'UserDetail-Admin');

    const user = await collection.findOne({ Contact });

    if (!user) {
      // Log false login attempt with the user's ID
      return res.status(401).json({ error: 'No user Exists' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.confirmPassword);
    console.log(passwordMatch + " " + password + " " + user.confirmPassword)
    if (!passwordMatch) {
      // Log false login attempt with the user's ID
      const falseLoginAttemptSuccess = await logFalseLoginAttempt(res, user._id);

      if (falseLoginAttemptSuccess == 3) {
        // Send the response only if logFalseLoginAttempt was not successful
        return res.status(401).json({ error: 'Too many failed login attempts. Please try again later.' });
      }
      if (falseLoginAttemptSuccess == 2) {
        // Send the response only if logFalseLoginAttempt was not successful
        return res.status(401).json({ error: 'Wrong Credentital.' });
      }
    }

    // Log successful login
    console.log(user._id)
    const falselogin = await logSuccessfulLogin(res, user._id);

    if (!falselogin) {
      return res.status(401).json({ error: 'Something went wrong' });
    }

    // Generate and send JWT
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function logFalseLoginAttempt(res, userId) {
  try {

    // Creating initial connection 
    const collection = await ConnectionStart(Auth_User_Transication, 'False_Request_Admin');


    const currentTimestamp = new Date();
    const timeThreshold = 10 * 60 * 1000; // 10 minutes

    // Assuming you have the ObjectId as a string
    const objectIdString = userId;

    // Convert the string to ObjectId
    const objectId = new ObjectId(objectIdString);

    // Extract timestamp from ObjectId
    const timestampFromObjectId = objectId.getTimestamp();

    // Calculate the start time for the time period
    const startTime = new Date(timestampFromObjectId - timeThreshold);

    const failedLoginAttempts = await collection.find({
      UserId: userId,
      timestamp: { $gte: startTime, $lte: currentTimestamp },
    }).toArray();



    console.log(failedLoginAttempts.length)

    if (failedLoginAttempts.length >= 3) {

      return 3;

    }

    const queues = queueNames.Auth_user.Admin_Login;

    await publishToQueue(queues.Admin_False_Log, JSON.stringify(userId));

    // Return true indicating success
    return 2;
  } catch (error) {
    console.error('Error in logFalseLoginAttempt:', error.message);
    // Log the error, but do not send a response here
    return 3;
  }
}

function generateRefreshToken(userId) {
  const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '5m' });
}

async function logSuccessfulLogin(res, username) {
  try {
    const queues = queueNames.Auth_user.Admin_Login;
    await publishToQueue(queues.Admin_Successful_Log, JSON.stringify(username));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
