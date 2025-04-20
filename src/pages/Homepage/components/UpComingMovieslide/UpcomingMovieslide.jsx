import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./UpComingMovieslide.style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1680 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1680, min: 1240 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 1240, min: 980 },
    items: 3,
  },
  mobile2: {
    breakpoint: { max: 980, min: 770 },
    items: 2,
  }, mobile3: {
    breakpoint: { max: 770, min: 0 },
    items: 1,
  },
};

const UpComingMovieslide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="upcoming-container">
      <h3 className="upcoming-title">UpComing Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {data?.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpComingMovieslide;
