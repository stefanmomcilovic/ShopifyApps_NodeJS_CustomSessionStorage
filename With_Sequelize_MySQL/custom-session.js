const sequelize = require("./database/database");
const { Session } = require("@shopify/shopify-api/dist/auth/session");
const { Shopify_custom_session_storage } = require("./../models/sequelizeModels");
const { Op } = require("sequelize");

async function storeCallback(session){
    console.log('storeCallback session: ', session);
    let transaction = await sequelize.transaction();

    try {
        let shopId;

        if(session.id.indexOf(`${session.shop}`) > -1){
            shopId = session.id;
        }

        let sessionData = await Shopify_custom_session_storage.upsert({
            sessionId: session.id,
            shopId: shopId,
            shop: `${session.shop}`,
            state: `${session.state}`,
            scope: `${ '' +session.scope + ''}`,
            expires: `${ '' +session.expires + ''}`,
            isOnline: `${session.isOnline}`,
            accessToken: `${session.accessToken}`,
            onlineAccessInfo: `${ '' +JSON.stringify(session.onlineAccessInfo) + ''}`
        }, {transaction});
        await transaction.commit();

        if(sessionData){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.log('storeCallback Error: ', err);
        if(transaction) {
            await transaction.rollback();
        }
        return false;
    }
}

async function loadCallback(id){
    let transaction = await sequelize.transaction();

    try {
        console.log('loadCallback Id: ', id);
        let session = new Session(id);
        console.log('session', session);

        let result = await Shopify_custom_session_storage.findAll({
            limit: 1,
            where: {
                [Op.or]: [
                    { sessionId: id },
                    { shopId: id }
                ]
            },
            raw: true
        }, {transaction});
        await transaction.commit();

        if(result.length > 0){
            console.log("---------------- RESULT ------------------");
            console.log(result);
            console.log("---------------- /RESULT ------------------");
            session.shop = result[0].shop;
            session.state = result[0].state;
            session.scope = result[0].scope;
            let today = new Date();
            let tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));
            session.expires = result[0].expires ? tomorrow : undefined;
            session.isOnline = result[0].isOnline == "true" ? true : false;
            session.accessToken = result[0].accessToken;
            session.onlineAccessInfo = result[0].onlineAccessInfo;
            console.log("---------------- SESSION ------------------");
                console.log(session);
            console.log("---------------- /SESSION ------------------");
            return session;
        }else{
            return undefined;
        }
        
    } catch(err) {
        console.log('loadCallback Error: ', err);
        if(transaction) {
            await transaction.rollback();
        }
        return undefined;
    }
  
}

async function deleteCallback(id){
    let transaction = await sequelize.transaction();

    try{
        console.log('deleteCallback ID: ', id);

        let deleteCall = await Shopify_custom_session_storage.destroy({
            limit: 1,
            where: {
               [Op.or]: [
                    { sessionId: id },
                    { shopId: id }
               ]
            }
        }, {transaction});
        await transaction.commit();


        if(deleteCall){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.log('deleteCallback Error: ', err);
        if(transaction) {
            await transaction.rollback();
        }
        return false;
    }
}

module.exports = {
    storeCallback,
    loadCallback,
    deleteCallback
};
