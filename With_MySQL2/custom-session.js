const mysql = require("mysql2");
const { Session } = require("@shopify/shopify-api/dist/auth/session");

let conn = mysql.createPool({
    host: `${process.env.DATABASE_HOST}`,
    user: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_DB}`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

async function storeCallback(session){
    try{
        console.log('storeCallback session: ', session);

        let shopId;

        if(session.id.indexOf(`${session.shop}`) > -1){
            shopId = session.id;
        }

        conn.query("INSERT INTO "+`${process.env.DATABASE_SESSION_STORAGE_TABLE}`+"(`sessionId`, `shopId`, `shop`, `state`, `scope`, `expires`, `isOnline`, `accessToken`, `onlineAccessInfo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `sessionId`= ?, `shopId`= ?, `shop`= ?, `state`= ?, `scope`= ?, `expires`= ?, `isOnline`= ?, `accessToken`= ?, `onlineAccessInfo`= ?",   [session.id, shopId, session.shop, session.state, session.scope, ''+session.expires+'', ''+session.isOnline+'', session.accessToken, ''+JSON.stringify(session.onlineAccessInfo)+'', 
        session.id, shopId, session.shop, session.state, session.scope, ''+session.expires+'', ''+session.isOnline+'', session.accessToken, ''+JSON.stringify(session.onlineAccessInfo)+''], function(error, results, fields){
            if(error) throw error;
        });
        return true;
    }catch(err){
        if(err) throw err;
        return false;
    }
}

async function loadCallback(id){
    try{
        console.log('loadCallback ID: ', id);

        const session = new Session(id);
        let query = new Promise((resolve, reject) => {
            const queryString = "SELECT * FROM "+`${process.env.DATABASE_SESSION_STORAGE_TABLE}`+" WHERE `sessionId`= ? OR `shopId`= ? LIMIT 1";
            conn.query(queryString, [id, id], function(error, results, fields){
                if(error) throw error;
                console.log("---------------- RESULTS -----------------");
                console.log(results);
                console.log("----------------- /RESULTS ----------------");
                session.shop = results[0].shop;
                session.state = results[0].state;
                session.scope = results[0].scope;
                let date = new Date();
                date.setDate(date.getDate() + 1);
                session.expires = results[0].expires ? date : undefined;
                session.isOnline = results[0].isOnline == "true" ? true : false;
                session.accessToken = results[0].accessToken;
                session.onlineAccessInfo = results[0].onlineAccessInfo;
                resolve(session);
            });
        }); 
        
        await query;
        return query;
    }catch(err){
        if(err) throw err;
        return undefined;
    }
}

async function deleteCallback(id){
    try{
        console.log('deleteCallback ID: ', id);
        let query = new Promise((resolve, reject) => {
            conn.query("DELETE FROM "+`${process.env.DATABASE_SESSION_STORAGE_TABLE}`+" WHERE `sessionId`= ? OR `shopId`= ?", [id, id], function(error, results, fields){
                if(error) throw error;
                resolve();
            });
        });
        await query;
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
