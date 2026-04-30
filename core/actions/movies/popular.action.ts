import { movieApi } from "@/core/api/movie-api";
import { MovieMapper } from "@/infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";

export const popularMoviesAction = async() => {
    try {
        const { data } = await movieApi.get<MovieDBMoviesResponse>('/popular')
        const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie));
        return movies;
    } catch (error) {
        console.log(error);
        throw "Cannot load now playing movie";
        
    }
}