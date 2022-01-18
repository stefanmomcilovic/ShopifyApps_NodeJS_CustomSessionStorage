1. When you install shopify app template with shopify cli

        shopify app create node 

2. Then in project folder install "npm install --save sequelize"

3. When you install sequelize then choose your database and install it
    
        # One of the following:
        npm install --save pg pg-hstore # Postgres
        npm install --save mysql2
        npm install --save mariadb
        npm install --save sqlite3
        npm install --save tedious # Microsoft SQL Server

4. Create models folder and create file for model example my is models/sequelizeModels.js and paste the following

        const { Sequelize } = require('sequelize');
        const sequelize = require('./../server/database/database');

        const Shopify_custom_session_storage = sequelize.define("shopify_custom_session_storage", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        sessionId: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        shop: {
            type: Sequelize.TEXT,
            allowNull: true,
            unique: true
        },
        state: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        scope: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        expires: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        isOnline: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        accessToken: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        onlineAccessInfo: {
            type: Sequelize.TEXT,
            allowNull: true
        }
        }, {
        timestamps: true
        });

        const Shopify_billings = sequelize.define("shopify_billings", {
            id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
            },
            chargeId: {
            type: Sequelize.TEXT,
            allowNull: false
            },
            shop: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
            },
            gid: {
            type: Sequelize.TEXT,
            allowNull: false
            },
            status: {
            type: Sequelize.TEXT,
            allowNull: false
            }
        }, {
            timestamps: true
        });

        module.exports = {
            Shopify_custom_session_storage,
            Shopify_billings
        };
        
        
5. Go to the servers folder and create folder for database connection example database/database.js and paste the following code

        const { Sequelize } = require('sequelize');

        const sequelize = new Sequelize('shopify_customsessionstorage_sequelize', 'root', '', {
            host: 'localhost',
            dialect: 'mysql'
        });

        module.exports = sequelize;

6. Use the provided file for custom-session.js and paste it into the server folder

7. Go to servers folder server.js and change all necessary things with provided server.js file

8. You are done!