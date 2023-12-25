import { MongoClient } from 'mongodb';
import Auth_User from '../../../api-gateway/config/Auth_User_Master.cjs';
import Userdetail from '../../../api-gateway/Model/Auth_User_Master/Userdetail-Admin.cjs';
// import user from '../../../api-gateway/Model/'
import mongoose from 'mongoose';

async function addUserToMongoDB(username) {
    const { url, databaseName } = Auth_User;

    console.log(`Adding user to MongoDB: ${username}`);

    const client = new MongoClient(url);

    try {
        await client.connect();
        
        const database = client.db(databaseName);
        const collection = database.collection('login');
        // const collection2 = database.collection('Userdetail');
    
        await collection.insertOne({ username });
        const newUser = new Userdetail({
              fname: 'John',
              lname: 'Doe',
              age: 25,
              gender: 'male',
              emailid: 'john.doe@example.com',
              address: '123 Main St',
              pincode: '123456',
              profileimage: new mongoose.Types.ObjectId(),
              createdby: new mongoose.Types.ObjectId(),
              updatedby: new mongoose.Types.ObjectId(),
              deletedby: null,
              active: true
          });
        // await collection2.insertOne(newUser);

      
    } catch (error) {
        console.error('Error adding user to MongoDB:', error.message);
        throw error; // Rethrow the error to handle it elsewhere if needed
    } finally {
        await client.close();
    }
}

export default addUserToMongoDB;
