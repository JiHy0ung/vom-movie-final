/*
  작성 날짜: 2025년 4월 15일
  작성자: 유지형
  제목: 넷플릭스 사이트
  내용: 

  홈페이지 ('/')
  영화 전체를 보여주는 페이지 (서치) ('/movies')
  영화 디테일 페이지 ('/movies/:id')
  추천 영화 ('/movies/:id/recommandation')
  영화 리뷰 ('/movies/:id/reviews')
*/

import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";


function App() {
  return (
    <div className="full-container">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
