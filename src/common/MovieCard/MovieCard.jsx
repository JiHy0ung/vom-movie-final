import React from "react";
import { Badge, Row } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const getPopularityLevel = (popularity) => {
    if (popularity <= 600) return "인기 중🍿";
    if (popularity <= 800) return "🔥핫한 영화";
    return "모두가 보는 영화!🤩";
  };

  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreOBj = genreData.find((genre) => genre.id === id);
      return genreOBj.name;
    });

    return genreNameList;
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
        <div className="adult-title">
          <div>
            {movie.adult ? (
              <img
                width={30}
                src="https://em-content.zobj.net/source/microsoft-3D-fluent/406/no-one-under-eighteen_1f51e.png"
                alt="over 18"
              />
            ) : (
              ""
            )}
          </div>
          <h1 className="moviecard-title">{movie.title}</h1>
        </div>

        <div className="moviecard-vote">
          <span
            className="moviecard-stars"
            style={{ display: "flex", gap: "3px" }}
          >
            {(() => {
              const score = movie.vote_average; // 0 ~ 9점
              const starCount = Math.round(score / 1.8); // 0~5
              const stars = [];

              for (let i = 0; i < 5; i++) {
                stars.push(
                  <img
                    key={i}
                    src="https://em-content.zobj.net/source/microsoft-3D-fluent/406/star_2b50.png"
                    alt="star"
                    className={`star-icon ${
                      i < starCount ? "active" : "inactive"
                    }`}
                  />
                );
              }

              return stars;
            })()}
          </span>
        </div>

        <div>
          <div className="moviecard-popularity">
            {getPopularityLevel(movie.popularity)}
          </div>
        </div>

        <div className="moviecard-genre-area">
          {showGenre(movie.genre_ids).map((id) => (
            <Badge bg="danger" className="moviecard-genre">
              {id}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
