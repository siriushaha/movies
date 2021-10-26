import React, { useState, useEffect }  from "react";
import "./index.css";

function Movie({movie}) {
    const { imdbID, Title } = movie;
    return (
        <li key={imdbID} className="slide-up-fade-in py-10">
            <span>{Title}</span>
        </li>
    )
}

function MovieList() {
    const [movies, setMovies] = useState(null);
    const [year, setYear] = useState("");
    const [url, setUrl] = useState(null);
    const handleChangeYear = (e) => {
        setYear(e.target.value);
    };
    const handleSearch = () => {
        setUrl(`https://jsonmock.hackerrank.com/api/movies?Year=${year}`);
    }
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.data);
                setYear("");
                setUrl(null);
            }
            catch (err) {
            }
        }
        fetchMovies();
    },[url]);
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="number" className="large" placeholder="Enter Year eg 2015" value={year} onChange={handleChangeYear} data-testid="app-input"/>
        <button className="" data-testid="submit-button" onClick={handleSearch} >Search</button>
      </section>
      <ul className="mt-50 styled" data-testid="movieList">
        {movies != null && movies.map(movie => <Movie key={movie.imdbID} movie={movie} />)}
      </ul>
      {movies != null && !movies.length && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>}
    </div>
  );
}

export default MovieList