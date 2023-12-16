const mongoose = require('mongoose');

// Define the schema for the "users" collection
const LanguageSchema = new mongoose.Schema({

    userid: mongoose.Schema.Types.ObjectId,
    Language_name: {
        type: String,
        required: true
    }, createdby: {
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

// Create the "User" model based on the schema
const User = mongoose.model('Language', LanguageSchema);

// Export the model to use in other parts of your application
module.exports = User;
