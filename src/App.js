import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=200e8be8";

const App = () => {
  const [movies, setMovies] = useState([]); // Holds the fetched movie data
  const [searchTerm, setSearchTerm] = useState(""); // Tracks user input for the search box

  // Fetches movies from OMDb API. Runs on initial render and when searchTerm changes.
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search); // Update state with new movies
  };

  // Initial search to populate app with "Jurassic Park" movies upon page load
  useEffect(() => {
    searchMovies("Jurassic Park");
  }, []);

  return (
    <div className="app">
      <h1>FakeFlix</h1>
      <div className="search">
        {/* Search bar for users to input movie titles */}
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Search icon triggers the search when clicked */}
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {/* Check if movies are returned for the search and if so, map over movies array to render a MovieCard for each */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
