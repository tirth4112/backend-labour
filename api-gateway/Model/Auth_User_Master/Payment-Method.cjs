const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    paymenttype: {
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
        required: true
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

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
