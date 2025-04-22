import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

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

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = ({ selected }) => {
    console.log("page", page);

    setPage(selected + 1);
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
    <p style={{ color: "gray", fontSize: "1.2rem", marginTop: "20px" }}>
      <strong>{`"${keyword}"`}</strong> 에 대한 검색 결과가 없습니다.
    </p>
  );

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {" "}
          필터{" "}
        </Col>
        <Col lg={8} xs={12}>
          {noResults}
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체 페이지
            previousLabel="< previous"
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
