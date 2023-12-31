import { MongoClient } from 'mongodb';
import Auth_User from '../../../api-gateway/config/Auth_User_Transication.cjs';
// import Userdetail from '../../../api-gateway/Model/Auth_User_Master/Userdetail-Admin.cjs';
import Login_logs_Admin from '../../../api-gateway/Model/Auth_User_Transication/Login_logs_Admin.cjs'
// import user from '../../../api-gateway/Model/'
import mongoose from 'mongoose';
import ConnectionStart from '../../../api-gateway/ConnectionStart.cjs';

async function Admin_Login_Successful_Controller(userId) {


    try {

        // const collection = database.collection('Login_Log_Admin');
   
        const collection = await ConnectionStart(Auth_User, 'Login_Log_Admin');
console.log(userId)
        const newUser = new Login_logs_Admin(
            {
                    UserId:userId,
                    timestamp: new Date(),
                    success: true,
                  }
          );
        await collection.insertOne(newUser);

      
    } catch (error) {
        console.error('Error adding user to MongoDB:', error.message);
        throw error; // Rethrow the error to handle it elsewhere if needed
    } finally {
    }
}

export default Admin_Login_Successful_Controller;
