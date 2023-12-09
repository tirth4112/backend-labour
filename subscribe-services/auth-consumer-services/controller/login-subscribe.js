//controller login-subscribe

const { MongoClient } = require('mongodb'); // Import the MongoClient from MongoDB
const config = require('../config/config');

async function addUserToMongoDB(username) {
    const { url, databaseName } = config.mongodb;
  
    console.log(`Adding user to MongoDB: ${username}`);
  
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      const database = client.db(databaseName);
      const collection = database.collection('login');
  
      // Insert the user data into MongoDB
      await collection.insertOne({ username });
      // console.log(`User added to MongoDB: ${username}`);
    } catch (error) {
      console.error('Error adding user to MongoDB:', error.message);
      throw error; // Rethrow the error to handle it elsewhere if needed
    } finally {
      await client.close();
    }
  }


  module.exports = addUserToMongoDB;















