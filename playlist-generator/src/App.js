import React, { useState } from 'react';
import './App.css';
import Loading from "./Loading";

function App() {
  const [description, setDescription] = useState('');
  const [playlist, setPlaylist] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // set isLoading to true when the form is submitted

    const url = 'http://localhost:8000/process_sentence';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        throw new Error('Error processing sentence');
      }

      const result = JSON.parse(await response.text());
      const playlist = JSON.parse(result.processed_sentence);

      setPlaylist(playlist);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // set isLoading back to false when the response is received
    }
  };
  const handleChange = (event) => {
    if(!isLoading) {
      setDescription(event.target.value);
      // Resize the input field as the user types
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    } else{
      event.preventDefault();
    }
  };


  return (
    <div className="container">
      <div className="search-bar">
        <h1>Define your perfect playlist:</h1>
        <form onSubmit={handleSubmit}>
          <textarea value={description} onChange={handleChange} />
          <button type="submit" disabled={isLoading}>Create Playlist</button>
        </form>
      </div>
      {isLoading && <Loading />}
      {!isLoading && playlist && playlist.songs && playlist.title && (
      <div className="playlist">
        <h2>{playlist.title}</h2>
        <ul>
          {playlist.songs.map((song, index) => (
            <li key={index}>
              <a href={song.link}>{song.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default App;