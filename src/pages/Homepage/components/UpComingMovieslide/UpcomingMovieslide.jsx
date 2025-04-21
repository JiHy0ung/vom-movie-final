import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./UpcomingMovieslide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../contants/responsive";

const UpComingMovieslide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="UpComing Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMovieslide;
