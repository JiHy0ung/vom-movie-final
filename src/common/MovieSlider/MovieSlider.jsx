import React from "react";
import "./MovieSlider.style.css";
import MovieCard from "../MovieCard/MovieCard";
import Carousel from "react-multi-carousel";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div className="popular-container">
      <h3 className="popular-title">{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
