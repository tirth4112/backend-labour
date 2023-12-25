const queueNames = require('../../../api-gateway/Rabbitmq/Queue.json');
const publishToQueue = require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');
const Auth_User = require('../../../api-gateway/config/Auth_User_Transication.cjs');
const ConnectionStart = require('../../../api-gateway/ConnectionStart.cjs');

exports.Admin_ForgetPassword = async (req, res) => {


  try {

    const collection = await ConnectionStart(Auth_User, 'Admin_PasswordChange');
    const data = req.query;
    const Contact = data.Contact;
    const users = await collection.find({ Contact }).toArray();

    if (!users) {
      // User with the specified contact already exists
      return res.status(401).json({ error: 'Contact not Exists' });
    }

    
    const queues = queueNames.Auth_user.Admin_Login;

    // Uncomment the following lines to publish data to the queue
    await publishToQueue(queues.Admin_ForgetPassword, JSON.stringify(data));

    res.status(200).json({ message: 'Password Change Successful' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ message: 'Password Not Changed' });
  } 
};
