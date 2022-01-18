import { PrismaClient } from '@prisma/client';
import { Session } from '@shopify/shopify-api/dist/auth/session';

const prisma = new PrismaClient();

module.exports.storeCallback = async function storeCallback(session){
    console.log('storeCallback called: ', session);
    return prisma.shopify_session_storage.upsert({
        create: {
            id: session.id,
            shop: session.shop,
            state: session.state,
            scope: session.scope,
            expires: session.expires,
            isOnline: ""+session.isOnline+"",
            accessToken: session.accessToken,
            onlineAccessInfo: JSON.stringify(session.onlineAccessInfo),
        },
        where: { 
            id: session.id 
        },
        update: {
            id: session.id,
            shop: session.shop,
            state: session.state,
            scope: session.scope,
            expires: session.expires,
            isOnline: ""+session.isOnline+"",
            accessToken: session.accessToken,
            onlineAccessInfo: JSON.stringify(session.onlineAccessInfo),
        }
    })
    .then(_ => {
        return true;
    })
    .catch(err => {
        if(err) throw err;
        return false;
    });
};
  
module.exports.loadCallback = async function loadCallback(id) {
    console.log('loadCallback called: ', id);
    return prisma.shopify_session_storage.findFirst({
        where: { 
            id: id
        }
    })
    .then(data => {
        if(!data) return undefined;
        const session = new Session(id);
        const { shop, state, scope, accessToken, isOnline, expires, onlineAccessInfo } = data;

        session.shop = shop;
        session.state = state;
        session.scope = scope;
        let date = new Date();
        date.setDate(date.getDate() + 1);
        session.expires = expires ? date : undefined;
        session.isOnline = isOnline == "true" ? true : false;
        session.accessToken = accessToken;
        session.onlineAccessInfo = onlineAccessInfo;

        console.log("loadCallback new session complete: ", session);
        return session;
    })
    .catch(err => {
        if(err) throw err;
        return undefined;
    })
    
};
  
module.exports.deleteCallback = async function deleteCallback(id){
  console.log('deleteCallback called: ', id);
  return prisma.shopify_session_storage.delete({
    where: { 
       id: id
    }
  })
  .then(_ => {
    return true;
  })
  .catch(err => {
    if(err) throw err;
    return false;
  });
};