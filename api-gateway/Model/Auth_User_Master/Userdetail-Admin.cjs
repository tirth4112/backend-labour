const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    emailid: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        match: /^[0-9]{6}$/
    },
    profileimage: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    updatedby: {
        type: mongoose.Schema.Types.ObjectId,
    },
    updatedon: {
        type: Date,
        default: Date.now
    },
    deletedby: {
        type: mongoose.Schema.Types.ObjectId
    },
    deletedon: {
        type: Date
    },
    active: {
        type: Boolean,
        default:true,
        required: true
    }
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);

module.exports = UserDetail;
