const queueNames = require('../../../api-gateway/Rabbitmq/Queue.json');
const publishToQueue = require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');
const { MongoClient } = require('mongodb');
const Auth_User = require('../../../api-gateway/config/Auth_User_Master.cjs');

exports.Registeration = async (req, res) => {

  const { url, databaseName } = Auth_User;
  const client = new MongoClient(url);
    await client.connect();
  try {
    const queues = queueNames.Auth_user;
    const data = req.query;

    const database = client.db(databaseName);
    const collection = database.collection('UserDetail-Admin');

    const Contact = data.Contact;
    const users = await collection.find({ Contact }).toArray();

    if (users.length > 0) {
      // User with the specified contact already exists
      return res.status(401).json({ error: 'User Already Exists' });
    }

    
    // Uncomment the following lines to publish data to the queue
    await publishToQueue(queues.Admin_Reg, JSON.stringify(data));

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ message: 'Registration unsuccessful' });
  } finally {
    // Close the MongoDB connection in the finally block
    if (client) {
      await client.close();
    }
  }
};
