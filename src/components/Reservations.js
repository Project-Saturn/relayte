import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeReservations from './MakeReservations';
import PendingReservations from './PendingReservations';
import ConfirmedReservations from './ConfirmedReservations';
require('dotenv').config();

function Reservations(props) {
  const {
    userType,
    user,
    setUser,
    joinVideoChat
  } = props;
  const [makeReservation, setMakeReservation] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => (
    getReservations()
  ), [makeReservation]);

  return (
    <div className='Reservations'>
      {makeReservation
        ? <MakeReservations
          user={user}
          setUser={setUser}
          setMakeReservation={setMakeReservation}
          userType={userType}
        />
        : (
          <div>
            {userType === 'customer'
              ? <button onClick={() => setMakeReservation(true)}>New Reservation</button>
              : (
                <div>
                  <p>Price: {user.price} Languages: {JSON.stringify(user.languages)}</p>
                  <button onClick={updateTranslator}>Click Here to Change</button>
                </div>
              )
            }
            <div className='confirmed'>
              <h3>Confirmed Reservations</h3>
              <ConfirmedReservations
                user={user}
                setUser={setUser}
                userType={userType}
                reservations={reservations}
                getReservations={getReservations}
                joinVideoChat={joinVideoChat}
              />
            </div>
            <div className='pending'>
              <h3>Pending Reservations</h3>
              <PendingReservations
                user={user}
                setUser={setUser}
                userType={userType}
                reservations={reservations}
                getReservations={getReservations}
              />
            </div>
          </div>
        )}
    </div>
  )

  async function getReservations() {
    const upToDateUser = (await axios.get(`/api/${userType}s/${user.id}`)).data[0];
    setUser(upToDateUser);
    const allReservations = [];
    for (let id of user.reservation_ids) {
      const reservation = await axios.get(`/api/reservations/${id}`);
      allReservations.push(reservation.data[0])
    }
    setReservations(allReservations.filter(e => e !== undefined));
  }

  async function updateTranslator() {
    const price = await prompt('Please enter your cost per hour (Numbers only)');
    const languages = await prompt('Please enter the languages you can translate to/from separated by spaces');
    const priceNum = Number(price);
    const languagesArr = languages.split(' ');
    if (typeof priceNum === 'number' && languagesArr instanceof Array){
      const modObject = {
        'translator': {
          'price': priceNum,
          'languages': languagesArr
        }
      };
      await axios.put(`/api/translators/${user.id}`, modObject);
    }
    const upToDateUser = (await axios.get(`/api/${userType}s/${user.id}`)).data[0];
    setUser(upToDateUser);
    getReservations();
  }
}

export default Reservations;
