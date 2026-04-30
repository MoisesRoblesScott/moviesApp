import { movieApi } from "@/core/api/movie-api";
import { MovieMapper } from "@/infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";

export const upComingMoviesAction = async() => {
    try {
        const { data } = await movieApi.get<MovieDBMoviesResponse>('/upcoming')
        const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie));
        return movies;
    } catch (error) {
        console.log(error);
        throw "Cannot load now playing movie";
        
    }
}