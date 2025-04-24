/*
  1. 배너 => popular movie의 첫번쨰 아이템을 보여줌.
  2. popular movie
  3. top rated movie
  4. upcoming movie
*/

import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieslide from "./components/PopularMovieslide/PopularMovieslide";
import TopRatedMovieslide from "./components/TopRatedMovieslide/TopRatedMovieslide";
import UpComingMovieslide from "./components/UpComingMovieslide/UpcomingMovieslide";
import { Spinner } from "react-bootstrap";

const Homepage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="loading-spinner">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
        }
      >
        <Banner />
        <PopularMovieslide />
        <TopRatedMovieslide />
        <UpComingMovieslide />
      </Suspense>
    </div>
  );
};

export default Homepage;
