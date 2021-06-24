import React, {Component, useState, useEffect} from 'react';
import './App.scss';

function Track (props) {
  const {track} = props;
  const ref = React.createRef();

  // function componentDidMount() {
  //   if(track !== null) {
  //     const child = track.attach();
  //     ref.current.classList.add(track.kind);
  //     ref.current.appendChild(child);
  //   }
  // }
  
  useEffect(() => {
      if(track !== null) {
        const child = track.attach();
        ref.current.classList.add(track.kind);
        ref.current.appendChild(child);
      }    
  })

  return (
    <div className='track' ref={ref}>

    </div>
  )
}

export default Track;
