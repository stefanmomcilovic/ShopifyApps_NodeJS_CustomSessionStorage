const mongoose = require('mongoose');

const sessionStorageSchema = new mongoose.Schema({
    sessionId: {
        type: String
    },
    shop: {
        type: String
    },
    state: {
        type: String
    },
    scope: {
        type: String
    },
    expires: {
        type: String
    },
    isOnline: {
        type: String
    },
    accessToken: {
        type: String
    },
    onlineAccessInfo: {
        type: String
    }
}, 
{
    timestamps: true
});

const shopifySessionStorage = mongoose.model('shopify_session_storage', sessionStorageSchema);

module.exports = shopifySessionStorage;