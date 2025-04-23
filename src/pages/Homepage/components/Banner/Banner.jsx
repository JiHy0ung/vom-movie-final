import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert, Spinner } from "react-bootstrap";
import "./Banner.style.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("ddd", data);

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

  const handleClick = () => {
    navigate(`/movies/${data.results[0].id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].backdrop_path}` +
          ")",
      }}
      className="banner"
      onClick={handleClick}
    >
      <div className="banner-text-area">
        <h1 className="banner-movie-title">{data?.results[0].title}</h1>
        {/* 줄거리가 한글로 안 나오는 영화들도 있음 (국내 미개봉 영화들) */}
        <p className="banner-movie-overview">{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
