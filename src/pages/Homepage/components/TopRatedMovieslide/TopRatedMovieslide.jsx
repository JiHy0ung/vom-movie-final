import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./TopRatedMovieslide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../contants/responsive";
import { Spinner } from "react-bootstrap";


const TopRatedMovieslide = () => {
  const { data, isError, error } = useTopRatedMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="믿고 보는 명작 리스트"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieslide;
