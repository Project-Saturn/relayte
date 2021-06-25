import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import axios from "axios";

const VideoChat = (props) => {
  const { guestName, guestRoom } = props;
  // const queryParams = new URLSearchParams(window.location.search);
  // const [guestRoom, setGuestRoom] = useState(queryParams.get("guestRoom"));
  // const [guestName, setGuestName] = useState(queryParams.get("guestName"));
  const [username, setUsername] = useState(guestName ? guestName : "");
  const [roomName, setRoomName] = useState(guestRoom ? guestRoom : "");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      // const response = await axios.post("/video/token", {"identity": username, "room": roomName});
      // const response = await axios.post("http://localhost:5000/video/token", {"identity": username, "room": roomName});
      const response = await axios.get(`http://localhost:5000/video/token/${roomName}/${username}`);
      // const response = await axios.get(`/video/token/${roomName}/${username}`);
      const { data } = response;
      Video.connect(data.token, {
        name: roomName,
        audio: true,
        video: true
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;
};

export default VideoChat;
