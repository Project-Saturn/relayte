import React, { useState } from "react";
import Reservation from "./Reservation";
import axios from "axios";
function Translator({ uuid, user }) {
  const [isDefault, setIsDefault] = useState(true)
  const [reservations, setReservations] = useState([])
  const [myUuid, setMyUuid] = useState("")
  const [userUuid, setUserUuid] = useState([])
  const tmp = []
  let string;
  const clickHandler = () => {
    setIsDefault(false)
  }
  const getReservations = async () => {
    await axios.get('http://localhost:5000/api/reservations').then(d => {
      return d.data
    }).then(data => {
      return data.filter(e => {
        console.log("in filter")

        console.log(string)
        console.log(e.translator_id === string, e.accepted === null)
        return e.translator_id === string && e.accepted === null
      });
    }
    ).then((filtered) => setReservations(filtered))
    // setReservations(tmp)
  }
  const handleAccept = async e => {
    const id = e.target.id
    console.log(e.target)
    console.log("ID! " + id)
    await axios.put(`http://localhost:5000/api/reservations/${id}`,
      { reservation: { "accepted": true } });
    console.log(reservations)
    setReservations(reservations.filter(e => e.id !== id));
  }
  const handleReject = async e => {
    const id = e.target.id
    await axios.put(`http://localhost:5000/api/reservations/${id}`,
      { reservation: { "accepted": false } });
    setReservations(reservations.filter(e => e.id !== id));
  }
  const getUuid = async () => {
    // console.log("uuid",uuid)
    await axios.get(`http://localhost:5000/api/translators/google/${user.providerData[0].uid}`).then(d => {
      setMyUuid(d.data[0].id)
      console.log('myUuid');
      console.log(d.data[0].id)
      string = d.data[0].id
      setUserUuid(d.data[0].reservation_ids)
    })
  }

  React.useEffect(() => {
    getUuid()
    getReservations()
  }, []);
  return (
    <div>
      {isDefault === true ? (
        <div>
          <div>Current Offers
            <table>
              <tbody>
                <tr>
                  <td>---Start Time---</td>
                  <td>---Duration---</td>
                  <td>---Accept---</td>
                  <td>---Reject?---</td>
                </tr>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.start_time}</td>
                    <td>{reservation.duration_minutes}</td>
                    <td><button
                      id={reservation.id}
                      onClick={handleAccept}>Accept</button></td>
                    <td><button
                      id={reservation.id}
                      onClick={handleReject}>Reject</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ) : (
        <Reservation
          userUuid={userUuid}
          /* ↑　予約IDの配列 */
          setIsDefault={setIsDefault}
        />
      )}
    </div>
  );
}
export default Translator;