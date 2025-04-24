import React, { useState } from "react";
import "./MovieDetail.style.css";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import YouTube from "react-youtube";
import { useMovieRecommendQuery } from "../../hooks/useMovieRecommend";
import MovieRecommend from "./components/MovieRecommend/MovieRecommend";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie } = useMovieDetailQuery(id);
  const { data: genre } = useMovieGenreQuery();
  const { data: trailer } = useMovieTrailerQuery(id);
  const { data: recommend } = useMovieRecommendQuery(id);
  const { data: reviews } = useMovieReviewsQuery(id);

  console.log("ddㅇㅇ", movie);
  console.log("rrr", recommend);
  console.log("rv", reviews);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!movie) {
    return (
      <div className="loading-spinner">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  const getPopularityLevel = (popularity) => {
    if (popularity <= 600) return "🍿주목받는 영화";
    if (popularity <= 800) return "🔥핫한 영화";
    return "모두가 보는 영화!🤩";
  };

  const showGenre = (genreList) => {
    if (!genre || !genreList) return [];

    return genreList.map((genre) => genre.name);
  };

  return (
    <div
      className="movie-detail-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`,
        undPosition: "center",
        backgroundSize: "cover",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="movie-detail-area">
        <img
          src={`${
            movie.poster_path
              ? `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
              : "/no-poster-image.png"
          }`}
          alt="movie-detail-poster"
          className="movie-detail-poster"
        />

        <div className="movie-detail-right">
          <div className="movie-detail-title-area">
            {movie.adult ? (
              <img
                width={60}
                height={60}
                src="https://em-content.zobj.net/source/microsoft-3D-fluent/406/no-one-under-eighteen_1f51e.png"
                alt="over 18"
              />
            ) : (
              ""
            )}
            <h1 className="movie-detail-title">{movie.title}</h1>
          </div>

          <div className="movie-detail-genre-area">
            {showGenre(movie.genres).map((name, index) => (
              <div key={index} bg="danger" className="movie-detail-genre">
                {name}
              </div>
            ))}
          </div>

          <div className="movie-detail-overview">
            <div className="movie-detail-overview-text">영화 줄거리</div>
            <div className="movie-detail-overview-content">
              {movie.overview ? (
                movie.overview
              ) : (
                <p>줄거리를 제공하지 않는 영화입니다.</p>
              )}
            </div>
          </div>

          <div className="movie-detail-infos">
            <div className="movie-detail-runtime">
              <div className="movie-detail-runtime-text">런타임</div>
              <div>{movie.runtime}분</div>
            </div>
            <div className="movie-detail-date">
              <div className="movie-detail-date-text">개봉일</div>
              <div>{movie.release_date}</div>
            </div>
            <div className="movie-detail-budget">
              <div className="movie-detail-budget-text">제작비</div>
              <div>${movie.budget.toLocaleString()}</div>
            </div>
          </div>

          <div className="movie-detail-vote-container">
            <div className="movie-detail-vote-area">
              <span
                className="movie-detail-stars"
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
                        className={`movie-detail-star-icon ${
                          i < starCount ? "active" : "inactive"
                        }`}
                      />
                    );
                  }
                  return stars;
                })()}
              </span>
              <div className="movie-detail-vote">
                ({(movie.vote_average / 1.8).toFixed(1)}점)
              </div>
            </div>
            <div className="movie-detail-popularity-area">
              <div className="movie-detail-popularity">
                {getPopularityLevel(movie.popularity)}
              </div>
              <div className="movie-detail-popularity-num">
                ({movie.popularity.toFixed(1)})
              </div>
            </div>
          </div>

          <div className="movie-detail-trailer-area">
            <button
              className="movie-detail-trailer-button"
              onClick={handleShow}
            >
              영화 예고편
            </button>
            <Modal show={show} onHide={handleClose} size="xl">
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {trailer ? (
                  <YouTube
                    videoId={trailer.key}
                    opts={{ width: "100%", height: "500px" }}
                  />
                ) : (
                  <p>예고편을 제공하지 않는 영화입니다.</p>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

      <div className="movie-detail-review-recommend-container">
        <div className="movie-detail-review-container">
          <MovieReviews movieId={id} />
        </div>

        <div className="movie-detail-recommend-container">
          <MovieRecommend movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
