# Elementor Test
Test assignment for Elementor

(For the rest of you - move along people, nothing to see here)

## To use:
  1. Run "`npm install`"
  2. In terminal window type "`npm run dev`"
  3. In another terminal window type "`npm run devServer`"
  4. Set up your MongoDB database (name of the database can be provided as environment variable, default is **ElementorTest**)
  5. Create two collections in your MongoDB database: **users** and **activeUsers** 
  
## Server environment variables:

`PORT` - port of the NodeJS server (default: 3000)

`MONGODB_URL` - URL of the MongoDB server (default: mongodb://localhost:27017)

`MONGODB_DATABASE` - MongoDB database name (default: ElementorTest)

`APP_TOKEN_SECRET` - JWT token secret key (default: elementor)

`CLIENT_POLLING_INTERVAL` - Sets the polling interval for getting the active users sessions (used in the client configuration)
