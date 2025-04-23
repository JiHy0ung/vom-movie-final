import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`, {
    params: {
      language: "ko-KR", // 영화 정보는 한글로
    },
  });
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000, // 5분
  });
};
