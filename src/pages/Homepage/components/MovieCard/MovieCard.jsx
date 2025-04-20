import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const getPopularityLevel = (popularity) => {
    if (popularity <= 600) return "인기 중";
    if (popularity <= 800) return "핫한 영화";
    return "모두가 보는 영화!";
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1 className="moviecard-title">{movie.title}</h1>
        <div className="moviecard-genre-area">
          {movie.genre_ids.map((id) => (
            <Badge bg="danger" className="moviecard-genre">
              {id}
            </Badge>
          ))}
        </div>
        <div>
          <div className="moviecard-vote">
            <span>평점: </span>
            <span className="moviecard-vote-score">{movie.vote_average.toFixed(1)}</span>
            <span>점</span>
          </div>
          <div className="moviecard-popularity">
            {getPopularityLevel(movie.popularity)}
          </div>
          <div>
            {movie.adult ? (
              <img
                width={35}
                src="https://em-content.zobj.net/source/microsoft-3D-fluent/406/no-one-under-eighteen_1f51e.png"
                alt="over 18"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
