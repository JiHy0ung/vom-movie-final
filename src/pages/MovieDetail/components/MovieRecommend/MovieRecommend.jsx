import React from "react";
import { useMovieRecommendQuery } from "../../../../hooks/useMovieRecommend";
import { Spinner } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import { Row, Col } from "react-bootstrap";
import "./MovieRecommend.style.css";

const MovieRecommend = ({ movieId }) => {
  const { data, isLoading, isError, error } = useMovieRecommendQuery(movieId);

  if (isLoading) {
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

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-recommend-container">
      <div className="movie-recommend-title">추천 영화</div>
      <Row className="movie-recommend-row">
        {data.map((movie, index) => (
          <Col key={index} xs={6} sm={6} md={6} lg={4} xl={3} >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieRecommend;
