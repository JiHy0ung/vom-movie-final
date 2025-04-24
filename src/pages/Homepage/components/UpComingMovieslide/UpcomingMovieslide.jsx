import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./UpcomingMovieslide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../contants/responsive";

const UpComingMovieslide = () => {
  const { data, isError, error } = useUpcomingMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="상영 예정 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMovieslide;
