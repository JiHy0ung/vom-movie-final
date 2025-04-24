import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated?language=en-US&page=1`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
    suspense: true,
    select: (result) => result.data,
  });
};
