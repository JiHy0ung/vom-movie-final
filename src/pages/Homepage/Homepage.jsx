/*
  1. 배너 => popular movie의 첫번쨰 아이템을 보여줌.
  2. popular movie
  3. top rated movie
  4. upcoming movie
*/

import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieslide from "./components/PopularMovieslide/PopularMovieslide";
import TopRatedMovieslide from "./components/TopRatedMovieslide/TopRatedMovieslide";
import UpComingMovieslide from "./components/UpComingMovieslide/UpcomingMovieslide";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieslide />
      <TopRatedMovieslide />
      <UpComingMovieslide />
    </div>
  );
};

export default Homepage;
