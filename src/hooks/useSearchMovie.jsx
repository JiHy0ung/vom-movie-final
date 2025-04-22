import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sort }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`discover/movie?sort_by=popularity.${sort}&page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, sort }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sort }],
    queryFn: () => fetchSearchMovie({ keyword, page, sort }),
    select: (result) => result.data,
  });
};
