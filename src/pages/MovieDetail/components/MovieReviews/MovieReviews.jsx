import React, { useState } from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieReviews";
import "./MovieReviews.style.css";
import { Spinner, Alert, Button } from "react-bootstrap";

const MovieReviews = ({ movieId }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(movieId);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
    <div className="movie-review-container">
      <div className="movie-review-title">영화 리뷰</div>
      <div className="movie-review-area">
        {data?.map((item, index) => {
          const isExpanded = expandedReviews[index];
          const shortContent = item.content.slice(0, 150);
          return (
            <div key={index} className="movie-review-item mb-4">
              <div className="movie-review-author-info">
                <div className="movie-review-author">{item.author}</div>
                <div className="movie-review-author-rating">
                  {item.author_details.rating
                    ? `${item.author_details.rating} / 10`
                    : "평점 없음"}
                </div>
              </div>
              <div className="movie-review-content">
                {isExpanded ? item.content : `${shortContent}...`}
              </div>
              {item.content.length > 150 && (
                <button
                  className="movie-review-button"
                  onClick={() => toggleReview(index)}
                >
                  {isExpanded ? "접기" : "더보기"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviews;
