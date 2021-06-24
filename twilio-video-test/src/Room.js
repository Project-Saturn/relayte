import React, { Component, useState, useEffect } from 'react';
import './App.scss';
import Participant from './Participant';

function Room(props) {
  const { room, returnToLobby } = props;
  const [remoteParticipants, setRemoteParticipants] = useState(Array.from(room.participants.values()));
  console.log(remoteParticipants);
  function leaveRoom() {
    room.disconnect();
    returnToLobby();
  }

  // function componentDidMount() {
  //   room.on('participantConnected', participant => addParticipant(participant));
  //   room.on('participantDisconnected', participant => removeParticipant(participant));
  //   window.addEventListener('beforeunload', leaveRoom);
  // }
  useEffect(() => {
    room.on('participantConnected', participant => addParticipant(participant));
    room.on('participantDisconnected', participant => removeParticipant(participant));
    // window.addEventListener('beforeunload', leaveRoom);
    return () => leaveRoom();
  }, [])

  // function componentWillUnmount() {
  //   leaveRoom();
  // }

  function addParticipant(participant) {
    console.log(`${participant.identity} has joined the room.`);
    setRemoteParticipants(...remoteParticipants, participant);
  }

  function removeParticipant(participant) {
    console.log(`${participant.identity} has left the room`);
    setRemoteParticipants(remoteParticipants.filter(p => p.identity !== participant.identity));
  }
  if (remoteParticipants instanceof Array) {
    return (
      <div className='room'>
        <div className='participants'>
          <Participant key={room.localParticipant.identity} localParticipant='true' participant={room.localParticipant} />
          {
            remoteParticipants.map(participant =>
              <Participant key={participant.identity} participant={participant} />
            )
          }
        </div>
        <button id='leaveroom' onClick={() => leaveRoom()}>Leave Room</button>
      </div>
    );
  } else {
    return <div></div>
  }
}

export default Room;
