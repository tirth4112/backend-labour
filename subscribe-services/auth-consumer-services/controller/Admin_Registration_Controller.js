import { MongoClient } from 'mongodb';
import Auth_User from '../../../api-gateway/config/Auth_User_Master.cjs';
import Userdetail from '../../../api-gateway/Model/Auth_User_Master/Userdetail-Admin.cjs';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

async function Admin_Registration_Controller(data) {
    const { url, databaseName } = Auth_User;
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log(data.fname);

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const hashedConfirmPassword = bcrypt.hashSync(data.confirmPassword, 10);

        const database = client.db(databaseName);
        const collection = database.collection('UserDetail-Admin');

        const newUser = new Userdetail({
            fname: data.fname,
            lname: data.lname,
            age: data.age,
            gender: data.gender,
            emailid: data.emailid,
            address: data.address,
            pincode: data.pincode,
            password: hashedConfirmPassword,
            confirmPassword: hashedConfirmPassword,
            Secret_Question:data.Secret_Question,
            Contact: data.Contact,
            profileimage: new mongoose.Types.ObjectId(),
            createdby: new mongoose.Types.ObjectId(),
            updatedby: new mongoose.Types.ObjectId(),
            deletedby: null,
            active: true
        });

        await collection.insertOne(newUser);
    } catch (error) {
        console.error('Error adding user to MongoDB:', error.message);
        throw error; // Rethrow the error to handle it elsewhere if needed
    } finally {
        await client.close();
    }
}

export default Admin_Registration_Controller;
