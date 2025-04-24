import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming?language=en-US&page=1`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    suspense: true,
    select: (result) => result.data,
  });
};
