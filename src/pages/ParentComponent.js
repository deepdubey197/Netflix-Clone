// ParentComponent.js
import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import Netflix from './Netflix';

function ParentComponent() {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleAddMovie = (movie) => {
    setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movie]);
  };

  const handleRemoveMovie = (movieId) => {
    setSelectedMovies((prevSelectedMovies) => prevSelectedMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div>
      <AdminLogin
        selectedMovies={selectedMovies}
        handleAddMovie={handleAddMovie}
        handleRemoveMovie={handleRemoveMovie}
      />
      <Netflix
        selectedMovies={selectedMovies}
        handleAddMovie={handleAddMovie}
        handleRemoveMovie={handleRemoveMovie}
      />
    </div>
  );
}

export default ParentComponent;
