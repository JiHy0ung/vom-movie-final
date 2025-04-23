import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useMovieDetailQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    select: (result) => result.data,
  });
};
