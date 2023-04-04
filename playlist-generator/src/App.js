import React, { useState } from 'react';
import './App.css';

function App() {
  const [sentence, setSentence] = useState('');
  const [playlist, setPlaylist] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/process_sentence';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence })
      });

      if (!response.ok) {
        throw new Error('Error processing sentence');
      }

      const result = await response.text();
      setPlaylist(result);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSentence(event.target.value);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <h1>Define your perfect playlist:</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={sentence} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      {playlist && (
        <div className="playlist">
          <h2>Playlist:</h2>
          <p>{playlist}</p>
        </div>
      )}
    </div>
  );
}

export default App;