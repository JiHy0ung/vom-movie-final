import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./UpcomingMovieslide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../contants/responsive";
import { Spinner } from "react-bootstrap";


const UpComingMovieslide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

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
