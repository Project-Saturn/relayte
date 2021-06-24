const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const dbConfig = require('./knexfile');
const path = require('path');
const knex = require('knex')(dbConfig);
const twilio = require('twilio');
const tokenGenerator = require('./tokenGenerator');

app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api/token/:roomName/:identity', async (req, res) => {
  const AccessToken = require('twilio').jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  // Used when generating any kind of Access Token
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY_SID;
  const twilioApiSecret = process.env.TWILIO_API_KEY_SECRET;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
  token.identity = req.params.identity;

  // Create a Video grant which enables a client to use Video 
  // and limits access to the specified Room (DailyStandup)
  const videoGrant = new VideoGrant({
    room: req.params.roomName
  });

  // Add the grant to the token
  token.addGrant(videoGrant);

  // Serialize the token to a JWT string
  const tokenJWT = token.toJwt();
  console.log(tokenJWT);
  res.json(tokenJWT);


  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = require('twilio')(accountSid, authToken);

  // client.video.rooms
  //   .create({
  //     // recordParticipantsOnConnect: true,
  //     // statusCallback: 'http://example.org',
  //     type: 'group',
  //     uniqueName: 'room'
  //   })
  //   .then(room => console.log(room.sid));


  // console.log('sending text');
  // const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  // const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

  // const twilio = require('twilio');
  // const client = new twilio(accountSid, authToken);

  // client.messages.create({
  //   body: 'Hello from Node',
  //   to: '+818035969228',  // Text this number
  //   from: '+13126638271' // From a valid Twilio number
  // })
  //   .then((message) => console.log(message.sid));
  // res.json('test completed');
});

app.get('/api/reservations', async (req, res) => {
  try {
    console.log('Get all reservations');
    const response = await knex('reservations')
      .select('*');
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    console.log('Get all customers');
    const response = await knex('customers')
      .select('*');
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/translators', async (req, res) => {
  try {
    console.log('Get all translators');
    const response = await knex('translators')
      .select('*');
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/reservations/:id', async (req, res) => {
  try {
    console.log(`Get reservation ${req.params.id}`);
    const response = await knex('reservations')
      .select('*')
      .where('id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/customers/:id', async (req, res) => {
  try {
    console.log(`Get customer ${req.params.id}`);
    const response = await knex('customers')
      .select('*')
      .where('id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/translators/:id', async (req, res) => {
  try {
    console.log(`Get translator ${req.params.id}`);
    const response = await knex('translators')
      .select('*')
      .where('id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/customers/google/:id', async (req, res) => {
  try {
    console.log(`Get customer with Google ID ${req.params.id}`);
    const response = await knex('customers')
      .select('*')
      .where('google_id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/translators/google/:id', async (req, res) => {
  try {
    console.log(`Get translator with Google ID ${req.params.id}`);
    const response = await knex('translators')
      .select('*')
      .where('google_id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    console.log('Create New Reservation');
    console.log(req.body.reservation);
    const reservation_id = (await knex('reservations')
      .insert(req.body.reservation, 'id'))[0];
    console.log({ 'id': reservation_id });
    const { customer_id, translator_id } = req.body.reservation;


    console.log('Updating customer');
    const customerReservations = (await knex('customers')
      .select('*')
      .where('id', customer_id))[0].reservation_ids;
    console.log('Current customer reservations');
    console.log(customerReservations);

    customerReservations.push(reservation_id);
    console.log('Updated customer reservations');
    console.log(customerReservations);

    const responseCustomer = await knex('customers')
      .where('id', customer_id)
      .update({ 'reservation_ids': customerReservations });
    console.log('Customer update response');
    console.log(responseCustomer);
    console.log('Customer updated');


    console.log('Updating translator');
    const translatorReservations = (await knex('translators')
      .select('*')
      .where('id', translator_id))[0].reservation_ids;
    console.log('Current translator reservations');
    console.log(translatorReservations);

    translatorReservations.push(reservation_id);
    console.log('Updated translator reservations');
    console.log(translatorReservations);

    const responseTranslator = await knex('translators')
      .where('id', translator_id)
      .update({ 'reservation_ids': translatorReservations });
    console.log('Translator update response');
    console.log(responseTranslator);
    console.log('Translator updated');

    res.json({ 'id': reservation_id });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    Object.assign(req.body.customer, { 'reservation_ids': [] });

    console.log('Create New Customer');
    console.log(req.body.customer);
    const customerId = await knex('customers')
      .insert(req.body.customer, 'id');
    console.log({ 'id': customerId[0] });

    res.json({ 'id': customerId[0] });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/translators', async (req, res) => {
  try {
    Object.assign(req.body.translator, { 'reservation_ids': [] });

    console.log('Create New Translator');
    console.log(req.body.translator);
    const translatorId = await knex('translators')
      .insert(req.body.translator, 'id');
    console.log({ 'id': translatorId[0] });

    res.json({ 'id': translatorId[0] });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.put('/api/reservations/:id', async (req, res) => {
  try {
    console.log(`Edit reservation id ${req.params.id}`);
    console.log(req.body.reservation);
    const response = await knex('reservations')
      .where('id', req.params.id)
      .update(req.body.reservation);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    console.log(`Edit customer id ${req.params.id}`);
    console.log(req.body.customer);
    const response = await knex('customers')
      .where('id', req.params.id)
      .update(req.body.customer);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.put('/api/translators/:id', async (req, res) => {
  try {
    console.log(`Edit translator id ${req.params.id}`);
    console.log(req.body.translator);
    const response = await knex('translators')
      .where('id', req.params.id)
      .update(req.body.translator);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.delete('/api/reservations/:id', async (req, res) => {
  try {
    console.log(`Delete reservation id ${req.params.id}`);
    const { customer_id, translator_id } = (await knex('reservations')
      .select('*')
      .where('id', req.params.id))[0];
    const responseReservation = await knex('reservations')
      .where('id', req.params.id)
      .del();
    console.log('Reservation delete response');
    console.log(responseReservation);

    console.log(`Updating customer id ${customer_id}`);
    console.log('Retrieving customer reservations');
    const customerReservations = (await knex('customers')
      .select('*')
      .where('id', customer_id))[0].reservation_ids;
    console.log(`Removing reservation ${req.params.id}`);
    const responseCustomer = await knex('customers')
      .where('id', customer_id)
      .update({
        'reservation_ids': customerReservations
          .filter(e => e !== req.params.id)
      });
    console.log(responseCustomer);
    console.log(`Reservation ${req.params.id} removed from customer`);

    console.log(`Updating translator id ${translator_id}`);
    console.log('Retrieving translator reservations');
    const translatorReservations = (await knex('translators')
      .select('*')
      .where('id', translator_id))[0].reservation_ids;
    console.log(`Removing reservation ${req.params.id}`);
    const responseTranslator = await knex('translators')
      .where('id', translator_id)
      .update({
        'reservation_ids': translatorReservations
          .filter(e => e !== req.params.id)
      });
    console.log(responseTranslator);
    console.log(`Reservation ${req.params.id} removed from translator`);
    res.json(responseReservation);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/room', async (req, res) => {
  console.log('Serving alternate page');
  res.sendFile(path.join(__dirname, 'client/build/newone.html'));
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
