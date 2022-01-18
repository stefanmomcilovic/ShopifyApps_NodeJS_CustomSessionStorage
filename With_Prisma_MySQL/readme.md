1. When you install shopify app template with shopify cli

        shopify app create node 

2. Then in project folder install "npm install prisma --save-dev"

3. Initialize Prisma with "npx prisma init"

4. Go to prisma folder in your project in schema.prisma file and paste this

        // This is your Prisma schema file,
        // learn more about it in the docs: https://pris.ly/d/prisma-schema

        generator client {
            provider = "prisma-client-js"
        }

        datasource db {
            provider = "mysql"
            url      = env("DATABASE_URL")
        }

        model shopify_session_storage {
            id               String   @id
            shop             String?  @db.Text
            state            String?  @db.Text
            scope            String?  @db.Text
            expires          String?  @db.Text
            isOnline         String?  @db.Text
            accessToken      String?  @db.Text
            onlineAccessInfo String?  @db.Text
            createdAt        DateTime @default(now())
            updatedAt        DateTime @updatedAt
        }

        model shopify_billing {
            id        Int      @id @default(autoincrement())
            chargeId  String   @db.Text
            shop      String   @unique
            gid       String   @db.Text
            status    String   @db.Text
            createdAt DateTime @default(now())
            updatedAt DateTime @updatedAt
        }
        
        
5. Go to .env file and paste this under defaults env data and change necessary things for database username, password, and db

        DATABASE_URL=mysql://username:password@localhost:3306/yourdatabasehere

6. If your working with linux and with localhost mysql maybe you will get some error when you try to migrate models if you get some error paste this command in your terminal

        sudo /opt/lampp/bin/mysql_upgrade


7. Then migrate provided models with command

        npx prisma migrate dev --name creating_starting_tables

8. Then add "custom-sessions.js" file into server folder

9. In server folder server.js file add necessary things see in server.js file provided.

10. You are done!