const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const dbConfig = require('./knexfile');
const path = require('path');
const knex = require('knex')(dbConfig);

app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api/reservations' , async (req, res) => {
  try {
    console.log('Get all reservations');
    const response = await knex('reservations').select('*');
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/customers' , async (req, res) => {
  try {
    console.log('Get all customers');
    const response = await knex('customers').select('*');
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get('/api/translators' , async (req, res) => {
  try {
    console.log('Get all translators');
    const response = await knex('translators').select('*');
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
    const response = await knex('reservations').select('*').where('id', req.params.id);
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
    const response = await knex('customers').select('*').where('id', req.params.id);
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
    const response = await knex('translators').select('*').where('id', req.params.id);
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
    const response = await knex('customers').select('*').where('google_id', req.params.id);
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
    const response = await knex('translators').select('*').where('google_id', req.params.id);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/reservations' , async (req, res) => {
  try {
    console.log('Create New Reservation');
    console.log(req.body.reservation);
    const reservation_id = await knex('reservations').insert(req.body.reservation, 'id');
    console.log(reservation_id);
    const { customer_id, translator_id } = req.body.reservation;
    const customerReservations = (await knex('customers')
      .select('*')
      .where('id', customer_id))[0].reservation_ids;
    customerReservations.push(reservation_id);
    const responseCustomer = await knex('customers')
      .where('id', customer_id)
      .update({'reservation_ids': customerReservations});
    const translatorReservations = (await knex('translators')
      .select('*')
      .where('id', translator_id))[0].reservation_ids;
    translatorReservations.push(reservation_id);
    const responseTranslator = await knex('translators')
      .where('id', translator_id)
      .update({'reservation_ids': translatorReservations});
    res.json(reservation_id);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/customers' , async (req, res) => {
  try {
    Object.assign(req.body.customer, {'reservation_ids': []});
    console.log('Create New Customer');
    console.log(req.body.customer);
    const response = await knex('customers').insert(req.body.customer);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post('/api/translators' , async (req, res) => {
  try {
    Object.assign(req.body.translator, {'reservation_ids': []});
    console.log('Create New Translator');
    console.log(req.body.translator);
    const response = await knex('translators').insert(req.body.translator);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.put('/api/reservations/:id', async (req, res) => {
  try {
    console.log(`Edit reservation id ${req.params.id}`);
    console.log(req.body.reservation);
    const response = await knex('reservations').where('id', req.params.id).update(req.body.reservation);
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
    const response = await knex('customers').where('id', req.params.id).update(req.body.customer);
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
    const response = await knex('translators').where('id', req.params.id).update(req.body.translator);
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
    const { customer_id, translator_id } = (await knex('reservations').select('*').where('id', req.params.id))[0];
    const response = await knex('reservations').where('id', req.params.id).del();
    console.log(`customer id ${customer_id}`);
    console.log(`translator id ${translator_id}`);
    const customerReservations = (await knex('customers')
      .select('*')
      .where('id', customer_id))[0].reservation_ids;
    const responseCustomer = await knex('customers')
      .where('id', customer_id)
      .update({'reservation_ids': customerReservations
        .filter(e => e !== req.params.id)});
    const translatorReservations = (await knex('translators')
      .select('*')
      .where('id', translator_id))[0].reservation_ids;
      const newReservations = translatorReservations
      .filter(e => e !== req.params.id)
      console.log(newReservations);
    const responseTranslator = await knex('translators')
      .where('id', translator_id)
      .update({'reservation_ids': translatorReservations
        .filter(e => e !== req.params.id)});
    res.json(response);
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