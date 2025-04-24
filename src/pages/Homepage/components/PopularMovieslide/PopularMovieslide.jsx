import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./PopularMovieslide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../contants/responsive";

const PopularMovieslide = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="요즘 난리난 인기 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieslide;
