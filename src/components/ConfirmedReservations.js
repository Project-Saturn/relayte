import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
require('dotenv').config();

function ConfirmedReservations(props) {
  const {
    user,
    setUser,
    userType,
    reservations,
    getReservations,
    joinVideoChat
  } = props;

  return <GetConfirmed />

  function GetConfirmed() {
    return reservations
      .filter(reservation => reservation ? reservation.accepted === true : false)
      .map(confirmed => (
        <Card id={confirmed.id} className='text-dark' key={confirmed.id}>
          <Row>
            <Col>
              <Card.Text>Start Time: {confirmed.start_time}</Card.Text>
            </Col>
            <Col>
              <Card.Text>Duration: {confirmed.duration_minutes}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={cancelReservation} variant='danger'>Cancel</Button>
            </Col>
            <Col>
              <Button onClick={joinVideoChat}>Join</Button>
            </Col>
          </Row>
        </Card>
      )
      )
  }

  async function cancelReservation(e) {
    try {
      console.log('canceling')
      const id = e.target.parentElement.parentElement.parentElement.id;
      await axios.delete(`/api/reservations/${id}`)
      const updatedUser = (await axios.get(`/api/${userType}s/${user.id}`)).data[0];
      setUser(updatedUser);
      getReservations();
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default ConfirmedReservations
