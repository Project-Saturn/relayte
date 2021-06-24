import React, { Component, useState, useEffect } from 'react';
import './App.scss';
import Track from './Track';

function Participant(props) {
  const { participant, localParticipant } = props
  // const [existingPublications, setExistingPublications] = useState(Array.from(participant.tracks.values()));
  // const [existingTracks, setExistingTracks] = useState(existingPublications.map(publication => publication.track));
  // const [nonNullTracks, setNonNullTracks] = useState(existingTracks.filter(track => track !== null));
  const existingPublications = Array.from(participant.tracks.values());
  const existingTracks = existingPublications.map(publication => publication.track);
  const nonNullTracks = existingTracks.filter(track => track !== null);
  const [tracks, setTracks] = useState(nonNullTracks);

  // function componentDidMount() {
  //   if (!localParticipant) {
  //     participant.on('trackSubscribed', track => addTrack(track));
  //   }
  // }
  
  useEffect(() => {
    if (!localParticipant) {
      participant.on('trackSubscribed', track => addTrack(track));
    }
  }, [tracks]);

  console.log('tracks')
  console.log(tracks instanceof Array)
  function addTrack(track) {
    setTracks(...tracks, track);
  }
  // if (tracks instanceof Array) {
    return (
      <div className='participant' id={participant.identity}>
        <div className='identity'>{participant.identity}</div>
        {
          tracks.map(track => 
            // <Track key={track} filter={this.state.filter} track={track} />)
            <Track key={track} track={track} />)
        }
      </div>
    );
  // } else {
  //   return <div></div>
  // }
}

export default Participant;
