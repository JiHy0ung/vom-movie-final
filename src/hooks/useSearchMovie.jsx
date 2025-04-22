import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sort, genreId }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  }

  if (genreId) {
    return api.get(
      `discover/movie?with_genres=${genreId}sort_by=popularity.${sort}&page=${page}`
    );
  }

  return api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, sort, genreId }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sort, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, sort, genreId }),
    select: (result) => result.data,
  });
};
