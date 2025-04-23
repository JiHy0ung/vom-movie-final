import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sort, genreId }) => {
  if (keyword) {
    return api.get(
      `/search/movie?query=${keyword}&sort_by=popularity.${sort}&page=${page}`,
      {
        params: {
          language: "ko-KR",
        },
      }
    );
  }

  if (genreId) {
    return api.get(
      `discover/movie?with_genres=${genreId}&sort_by=popularity.${sort}&page=${page}`,
      {
        params: {
          language: "ko-KR",
        },
      }
    );
  }

  return api.get(`discover/movie?sort_by=popularity.${sort}&page=${page}`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useSearchMovieQuery = ({ keyword, page, sort, genreId }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sort, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, sort, genreId }),
    select: (result) => {
      if (keyword) {
        const sorted = [...result.data.results].sort((a, b) =>
          sort === "desc"
            ? b.popularity - a.popularity
            : a.popularity - b.popularity
        );
        return {
          ...result.data,
          results: sorted,
        };
      }
      return result.data;
    },
  });
};
