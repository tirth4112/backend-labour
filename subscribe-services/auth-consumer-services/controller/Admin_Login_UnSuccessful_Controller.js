import { MongoClient } from 'mongodb';
import Auth_User from '../../../api-gateway/config/Auth_User_Transication.cjs';
import False_Request_Admin from '../../../api-gateway/Model/Auth_User_Transication/False_Request_Admin.cjs'
// import user from '../../../api-gateway/Model/'
import mongoose from 'mongoose';
import ConnectionStart from '../../../api-gateway/ConnectionStart.cjs';

async function Admin_Login_unSuccessful_Controller(userId) {
      try {  
        const collection = await ConnectionStart(Auth_User, 'False_Request_Admin');

        // const collection = database.collection('False_Request_Admin');
   
 
        const newData = new False_Request_Admin(
            {
                UserId:   userId,
                  timestamp: new Date(),
                }
          );
        await collection.insertOne(newData);

      
    }catch (error) {
        console.error('Error adding user to MongoDB:', error.message);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

export default Admin_Login_unSuccessful_Controller;
