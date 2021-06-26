import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoChat from './VideoChat';
import MakeReservations from './MakeReservations';
import Reservations from './Reservations'
require('dotenv').config();

function WelcomePage(props) {
  const { user, setUser, userType, auth } = props;
  const [reservations, setReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservataions] = useState([]);
  const [pendingReservations, setPendingReservataions] = useState([]);
  const [roomID, setRoomID] = useState();
  const [makeReservation, setMakeReservation] = useState(false);
  const [trigger, setTrigger] = useState(false)
  useEffect(() => {
    console.log("useEffect here")
    getReservations();
  }, [])

  return (
    <div className='WelcomePage'>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      {roomID
        ? <VideoChat guestName={user.name} guestRoom={roomID} setRoomID={setRoomID} />
        : <div className='reservations'>
          {makeReservation
            ? <MakeReservations user={user} setMakeReservation={setMakeReservation} getReservations={getReservations} setReservations={setReservations} reservations={reservations}/>
            : <Reservations />
          }
          {/* <Reservations /> */}
        </div>
      }
    </div>
  );


  
  function Reservations() {
    return (
      <div className='Reservations'>
        {userType === 'customer'
          ? <button onClick={() => setMakeReservation(true)}>New Reservation</button>
          : <div></div>}
        <div className='confirmed'>
          <h3>Confirmed Reservations</h3>
          <ConfirmedReservations />
        </div>
        <div className='pending'>
          <h3>Pending Reservations</h3>
          <PendingReservations />
        </div>
      </div>
    )
  }

  function joinVideoChat(e) {
    const id = e.target.parentElement.parentElement.parentElement.id;
    setRoomID(id);
  }

  async function getReservations() {
    console.log('getting reservations')
    const upToDateUser = (await axios.get(`/api/${userType}s/${user.id}`)).data[0];
    console.log('up to date user')
    console.log(upToDateUser)
    setUser(upToDateUser);
    const allReservations = [];
    for (let id of user.reservation_ids) {
      const reservation = await axios.get(`http://localhost:5000/api/reservations/${id}`);
      allReservations.push(reservation.data[0])
    }
    // const allReservations = await axios.all(
    //   user.reservation_ids
    //     .map(id => axios.get(`/api/reservations/${id}`).then((response) => response.data[0]))
    // );
    // console.log('allreservations');
    
    // while(!reservations) {};
    console.log('in getreservations')
    console.log(reservations)
    // const confirmed = allReservations
    const confirmed = reservations
    .filter(reservation => reservation.accepted === true)
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
    ));
    setConfirmedReservataions(confirmed);
    // const pending = allReservations
    const pending = reservations
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
    console.log('pending length')
    console.log(pending.length)
    setPendingReservataions(pending); 
    setReservations(allReservations);
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

  async function cancelReservation(e) {
    try {
      const id = e.target.parentElement.parentElement.parentElement.id;
      await axios.delete(`/api/reservations/${id}`)
        .then(() => setReservations(reservations.filter(e => e.id !== id)));
    } catch (error) {
      console.error(error.message);
    }
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

  function ConfirmedReservations() {
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
      );
  }

  function PendingReservations() {
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
      )
      );
  }
}


export default WelcomePage;
