This is a simple online store primarily built using Node.js. Key functionalities include adding, updating, and deleting products, as well as viewing product details. Each user can only manage their own products, meaning:

You cannot delete or modify products added by another user.
Other users also cannot delete or modify the products you’ve added.
The application is developed using Node.js and Express.js with the following libraries:

bcrypt: for hashing passwords,
connect-flash: for flash messages,
cookie-parser: for parsing cookies,
dotenv: for environment variable management,
express-handlebars: for templating,
express-session: for session management,
jsonwebtoken: for handling JSON Web Tokens,
mongoose: for managing the MongoDB database,
nodemon: for automatic server restarting during development.
The database used is MongoDB.
