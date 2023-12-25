// Admin_ForgetPassword_Controller


import { MongoClient } from 'mongodb';
import Auth_User from '../../../api-gateway/config/Auth_User_Transication.cjs';
import Login_logs_Admin from '../../../api-gateway/Model/Auth_User_Transication/Login_logs_Admin.cjs'
import mongoose from 'mongoose';

async function Admin_ForgetPassword_Controller(username) {
    const { url, databaseName } = Auth_User;

    console.log(`Adding user to MongoDB: ${username}`);

    const client = new MongoClient(url);

    try {
        await client.connect();
        
        const database = client.db(databaseName);
        const collection = database.collection('Admin_PasswordChange');
   
 
        const newUser = new Login_logs_Admin(
            {
                    UserId:username,
                    timestamp: new Date(),
                    success: true,
                  }
          );
        await collection.insertOne(newUser);

      
    } catch (error) {
        console.error('Error adding user to MongoDB:', error.message);
        throw error; // Rethrow the error to handle it elsewhere if needed
    } finally {
        await client.close();
    }
}

export default Admin_ForgetPassword_Controller;
