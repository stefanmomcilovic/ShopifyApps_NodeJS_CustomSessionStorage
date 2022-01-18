1. When you install shopify app template with shopify cli
    -shopify app node create

2. Then in project folder install "npm i mysql2"
3. Create database and import sql
4. Go to .env file into your project folder and paste this
    DATABASE_HOST=localhost
    DATABASE_USER=root
    DATABASE_PASSWORD=
    DATABASE_DB=shopify_testing_app_bck

    DATABASE_SESSION_STORAGE_TABLE=shopify_session_storage
    DATABASE_BILLINGS_TABLE=shopify_billings
5. Change necessary values in .env file
6. Add custom-session.js file into server folder
7. In server.js file add necessary things see in file provided.
8. You are done!