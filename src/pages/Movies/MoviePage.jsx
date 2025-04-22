import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

/*
  movie 페이지에 올 수 있는 경로 2가지
  1. Navbar에서 클릭하여 이동. => popular movie.
  2. keyword를 검색하여 이동. => keyword와 관련된 영화.

  페이지네이션
  1. 페이지네이션 설치
  2. page state 만들기
  3. 페이지네이션 클릭할 때마다 page 바꿔주기
  4. page값이 변할 때마다 useSearchMovie에 page까지 넣어 fetch
*/

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // 장르
  const { data: genres } = useMovieGenreQuery();

  const keyword = query.get("q");

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sort,
    genreId: selectedGenre,
  });

  const handlePageClick = ({ selected }) => {
    console.log("page", page);

    setPage(selected + 1);
  };

  const handleSort = () => {
    setSort((prev) => (prev === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  console.log("ddd", data);

  if (isLoading) {
    return (
      <div>
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

  const noResults = data?.results.length === 0 && keyword && (
    <div className="no-result-area">
      <p className="no-result">
        <span className="no-result-keyword">{`"${keyword}"`}</span>에 대한 검색
        결과가 없습니다.
      </p>
    </div>
  );

  return (
    <Container className="movie-page-container">
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col lg={2} xs={12}>
          <div className="filter-area">
            <div className="popularity-area">
              <button className="popularity-button" onClick={handleSort}>
                인기도
                {sort === "desc" ? (
                  <p className="popularity-desc">⬆︎</p>
                ) : (
                  <p className="popularity-asc">⬇︎</p>
                )}
              </button>
            </div>
            <div className="genre-select-area">
              <div className="genre-select">
                <button
                  className="genre-button"
                  onClick={() => {
                    setSelectedGenre(null);
                    setPage(1);
                    setQuery({});
                  }}
                >
                  전체 보기
                </button>
                {genres?.map((genre) => (
                  <button
                    key={genre.id}
                    className={`genre-button ${
                      selectedGenre === genre.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedGenre(genre.id);
                      setPage(1); // 필터 변경 시 첫 페이지로 초기화
                    }}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          {keyword ? (
            <div className="no-result-area">
              <p className="no-result">
                <span className="no-result-keyword">{`"${keyword}"`}</span>에
                대한 검색 결과
              </p>
            </div>
          ) : (
            noResults
          )}
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={3} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체 페이지
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1} // 현재 페이지
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
