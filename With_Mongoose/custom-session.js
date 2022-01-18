const shopifySessionStorageModel = require('./../models/shopifySessionStorageModel');
const { Session } = require("@shopify/shopify-api/dist/auth/session");

async function storeCallback(session){
    try{
        console.log('storeCallback session: ', session);
        let data = {
            sessionId: session.id,
            shop: session.shop,
            state: session.state,
            scope: session.scope,
            expires: ''+session.expires+'',
            isOnline: session.isOnline,
            accessToken: session.accessToken,
            onlineAccessInfo: ''+JSON.stringify(session.onlineAccessInfo)+''
        };
    
       let doc = await shopifySessionStorageModel.findOneAndUpdate({sessionId: `${session.id}`}, data, {upsert: true});
       console.log('----------------- Result 1 ------------------');
        console.log(doc);
       console.log('----------------- End of Result 1 ------------------');
        return true;
    }catch(err){
        if(err) throw err;
        return false;
    }
}

async function loadCallback(id){
    try{
        console.log('loadCallback ID: ', id);
        let session = new Session(id);
        console.log('session', session);
        let doc = await shopifySessionStorageModel.findOne({sessionId: `${id}`});
        session.shop = doc.shop;
        session.state = doc.state;
        session.scope = doc.scope;
        let date = new Date();
        date.setDate(date.getDate() + 1);
        session.expires = doc.expires ? date : undefined;
        session.isOnline = doc.isOnline == "true" ? true : false;
        session.accessToken = doc.accessToken;
        session.onlineAccessInfo = doc.onlineAccessInfo;
        return session;
    }catch(err){
        if(err) throw err;
        return false;
    }
   
}

async function deleteCallback(id){
    try{
        console.log('deleteCallback ID: ', id);
        let doc = await shopifySessionStorageModel.findOneAndRemove({sessionId: `${id}`});
        console.log('----------------- Result 3 ------------------');
            console.log(doc);
        console.log('----------------- End of Result 3 ------------------');
        return true;
    }catch(err){
        if(err) throw err;
        return false;
    }
}

module.exports = {
    storeCallback,
    loadCallback,
    deleteCallback
};