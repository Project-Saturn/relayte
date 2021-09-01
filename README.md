# Relayte
This is an app to connect users to translators to help navigate difficult communication situations in foreign languages.  You can see a live version by clicking the link below.

[Relayte on Heroku](https://relayte.herokuapp.com/)

## Running Relayte locally
Clone the repository locally and create a .env file in the root of the project with the following environment variables defined

### REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID
These are associated with your Firebase account and can be found in the bottom of
"Project Settings" -> "General"
of your associated Firebase project

### DATABASE_URL
This is the url of your PostgreSQL database in the following format:
postgres://\<username>:\<password>@\<url>:\<password>/\<database name>

### TWILIO_ACCOUNT_SID
This can be found on your project dashboard on your Twilio account

### TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET
These can be found when you generate new API keys.  Please follow the instructions at https://www.twilio.com/docs/glossary/what-is-an-api-key

## Running the app in a dev environment
1. From a new terminal instance, navigate to the project's root directory and run "npm run knex apply:migrations"
2. Start the server using the command "npm run dev:server"
3. Start the client using the command "npm run dev:client" and access the app from localhost:3000

## Running a production build of the app
1. From a new terminal instance, navigate to the project's root directory and run "npm run knex apply:migrations"
2. Build the front-end using the command "npm run build:client"
3. Start the server with the command "npm start" and access the appfrom localhost:5000

## Migrations
Database migrations can be run using the following commands

### npm run new:migration <migration name>
This will create a new migration file in the migrations directory

### npm run apply:migrations
This will run any migration files that have yet to be run on the database

### npm run rollback:migration
This will roll back to the previous migration

## API Endpoints

The following are the API endpoints used on the server

### GET /video/token/:room/:identity
Takes in the room ID (:room) and username (:identity) and returns a Twilio access token

### GET /api/reservations
Returns data for all reservations in database

### GET /api/customers
Returns data for all customers in database

### GET /api/translators
Returns data for all translators in database

### GET /api/reservations/:id
Returns data for resevation with matching id (:id)

### GET /api/customers/:id
Returns data for customer with matching id (:id)

### GET /api/translators/:id
Returns data for translator with matching id (:id)

### GET /api/customers/google/:id
Returns data for customer with matching google id (:id)

### GET /api/translators/google/:id
Returns data for translator with matching google id (:id)

### POST /api/reservations
Creates a new reservation

### POST /api/customers
Creates a new customer

### POST /api/translators
Creates a new translator

### PUT /api/reservations/:id
Modifies reservation with matching id (:id)

### PUT /api/customers/:id
Modifies customer with matching id (:id)

### PUT /api/translators/:id
Modifies translator with matching id (:id)

### DELETE /api/reservations/:id
Deletes reservation with matching id (:id)

## Technologies Used
### Node.js
This was used to write the back-end for this app

### Express.js
This was used to write the server as well as create and handle the API endpoints

### PostgreSQL
PostgreSQL was used as a database to store all the user and reservation information

### Knex.js
Knex.js was used to architect and interact with the PostgreSQL database

### React
React was used for creating the front-end for this app

### Firebase
Firebase was used to handle user login and authentication

### Twilio
Twilio was used on the back-end and front-end to allow users access to real-time video communicaiton
