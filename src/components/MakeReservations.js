import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
require('dotenv').config();

function MakeReservations(props) {
  const { user, setMakeReservation, getReservations, setReservations, reservations } = props;
  const [translators, setTranslators] = useState([])
  useEffect(() => {
    getTranslators();
  }, []);

  return (
    <div className='MakeReservations'>
      <Button onClick={() => setMakeReservation(false)}>Back</Button>
      <ListTranslators />
    </div>
  )

  function ListTranslators() {
    return translators
      .map(translator => (
        <Card id={translator.id} className='text-dark' key={translator.id}>
          <Row>
            <Col>
              <Card.Title>Name:</Card.Title>
              <Card.Text>{translator.name}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Price per Hour:</Card.Title>
              <Card.Text>{translator.price}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Title>Languages:</Card.Title>
              {translator.languages.map(language => <Card.Text>{language}</Card.Text>)}
            </Col>
            <Col>
              <Button onClick={selectTranslator} variant='success'>Select</Button>
            </Col>
          </Row>
        </Card>
      )
    );
  }

  async function selectTranslator(e) {
    try {
      const translatorID = e.target.parentElement.parentElement.parentElement.id;
      const customerID = user.id;
      const startTime = await prompt('Please enter the start date and time.');
      const duration = await prompt('Please specify the duration of the meeting.')
      const newReservation = {
        reservation: {
          start_time: startTime,
          duration_minutes: duration,
          customer_id: customerID,
          translator_id: translatorID
        }
      }

      // const updatedReservations = await axios.post(`/api/reservations/`, newReservation)
      // .then(() => axios.get('/api/reservations'));
      const updatedReservation = await axios.post(`/api/reservations/`, newReservation);
      console.log('updatedReservation')
      console.log(updatedReservation)
      const latestReservation = await axios.get(`/api/reservations/${updatedReservation.data.id}`)
      console.log('latest reservation');
      console.log(latestReservation);

      // setReservations([...reservations, ...latestReservation.data]);     
      reservations.push(...latestReservation.data)
      
      // console.log('updatedReservations')
      // console.log(updatedReservations)
      // setReservations(updatedReservations);
      await getReservations()
      setMakeReservation(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getTranslators() {
    const allTranslators = await axios.get('/api/translators/').then((response) => response.data);
    console.log(allTranslators);
    setTranslators(allTranslators);
  }
}


export default MakeReservations;
