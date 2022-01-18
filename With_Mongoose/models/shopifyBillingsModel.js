const mongoose = require('mongoose');

const billingsModel = new mongoose.Schema({
    chargeId: {
        type: String,
        required: [true, 'Charge ID is required']
    },
    shop: {
        type: String,
        required: [true, 'Shop is required'],
        unique: true
    },
    gid: {
        type: String,
        required: [true, 'GID is required'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
    }
}, 
{
    timestamps: true
});

const shopifyBillings = mongoose.model('shopify_billing', billingsModel);

module.exports = shopifyBillings;