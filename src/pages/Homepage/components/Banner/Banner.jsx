import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("ddd", data);

  if (isLoading) {
    return <h1 className='text-white'>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].backdrop_path}` +
          ")",
      }}
      className="banner"
    >
      <div className="banner-text-area">
        <h1 className="banner-movie-title">{data?.results[0].title}</h1>
        {/* 줄거리가 한글로 안나옴 */}
        <p className="banner-movie-overview">{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
