import React, { useState } from 'react'

export const Player = () => {
    const [track, setTrack] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTrack(URL.createObjectURL(file));
  };


 return (
    <div>
        <input type="file" accept=".mp3,audio/*" onChange={handleFileChange} />
        {track && (
            <audio controls src={track}>
            Your browser does not support the audio element.
            </audio>
        )}
    </div>
  );
}
