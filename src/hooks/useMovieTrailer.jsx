import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}/videos?language=en-US`);
};

export const useMovieTrailerQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    select: (data) => {
      const videos = data.data.results;
      const youtubeTrailer = videos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      return youtubeTrailer || null;
    },
  });
};
