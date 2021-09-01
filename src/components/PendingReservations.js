import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
require('dotenv').config();

function PendingReservations(props) {
  const { 
    user,
    setUser,
    userType,
    reservations,
    getReservations
  } = props;

  return <GetPending />

  function GetPending() {
    return reservations
    .filter(reservation => {
      if (userType === 'customer') return !(reservation.accepted)
      return (reservation.accepted === null)
    })
    .map(pending => (
      <Card id={pending.id} className='text-dark' key={pending.id}>
        <Row>
          <Col>
            <Card.Text>Start Time: {pending.start_time}</Card.Text>
          </Col>
          <Col>
            <Card.Text>Duration: {pending.duration_minutes}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            {userType === 'customer'
              ? <Button onClick={cancelReservation} key={pending.id} variant='danger'>Cancel</Button>
              : <Button onClick={rejectReservation} key={pending.id} variant='danger'>Reject</Button>
            }
          </Col>
          <Col>
            {userType === 'customer'
              ? <Button key={pending.id} variant={'warning'}>{pending.accepted === null ? 'Pending' : 'Rejected'}</Button>
              : <Button onClick={acceptReservation} key={pending.id} variant='success'>Accept</Button>
            }
          </Col>
        </Row>
      </Card>
    ));
  }

  async function acceptReservation(e) {
    try {
      const id = e.target.parentElement.parentElement.parentElement.id;
      const modObject = {
        'reservation': {
          accepted: true
        }
      }
      await axios.put(`/api/reservations/${id}`, modObject).then(() => getReservations());
    } catch (error) {
      console.error(error.message);
    }
  }

  async function cancelReservation(e) {
    try {
      const id = e.target.parentElement.parentElement.parentElement.id;
      await axios.delete(`/api/reservations/${id}`)
      const updatedUser = (await axios.get(`/api/${userType}s/${user.id}`)).data[0];
      setUser(updatedUser);
      getReservations();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function rejectReservation(e) {
    try {
      const id = e.target.parentElement.parentElement.parentElement.id;
      const modObject = {
        'reservation': {
          accepted: false
        }
      }
      await axios.put(`/api/reservations/${id}`, modObject).then(() => getReservations());
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default PendingReservations
