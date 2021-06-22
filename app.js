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
app.use(express.static('client/build'));

app.get('/api/reservations' , async (req, res) => {
  console.log('Get all reservations');
  const response = await knex('reservations').select('*');
  console.log(response);
  res.json(response);
});

app.get('/api/customers' , async (req, res) => {
  console.log('Get all customers');
  const response = await knex('customers').select('*');
  console.log(response);
  res.json(response);
});

app.get('/api/translators' , async (req, res) => {
  console.log('Get all translators');
  const response = await knex('translators').select('*');
  console.log(response);
  res.json(response);
});

app.post('/api/reservations' , async (req, res) => {
  console.log('Create New Reservation');
  console.log(req.body.reservation);
  const response = await knex('reservations').insert(req.body.reservation);
  console.log(response);
  res.json(response);
});

app.post('/api/customers' , async (req, res) => {
  console.log('Create New Customer');
  console.log(req.body.customer);
  const response = await knex('customers').insert(req.body.customer);
  console.log(response);
  res.json(response);
});

app.post('/api/translators' , async (req, res) => {
  console.log('Create New Translator');
  console.log(req.body.translator);
  const response = await knex('translators').insert(req.body.translator);
  console.log(response);
  res.json(response);
});

app.put('/api/reservations/:id' , async (req, res) => {
  console.log(`Edit reservation id ${req.params.id}`);
  console.log(req.body.reservation);
  const response = await knex('reservations').where('id', req.params.id).update(req.body.reservation);
  console.log(response);
  res.json(response);
});

app.put('/api/customers/:id' , async (req, res) => {
  console.log(`Edit customer id ${req.params.id}`);
  console.log(req.body.customer);
  const response = await knex('customers').where('id', req.params.id).update(req.body.customer);
  console.log(response);
  res.json(response);
});

app.put('/api/translators/:id' , async (req, res) => {
  console.log(`Edit translator id ${req.params.id}`);
  console.log(req.body.translator);
  const response = await knex('translators').where('id', req.params.id).update(req.body.translator);
  console.log(response);
  res.json(response);
});

app.get('/room', async (req, res) => {
  console.log('Serving alternate page');
  res.sendFile(path.join(__dirname, 'client/build/newone.html'));
})
 
  
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});