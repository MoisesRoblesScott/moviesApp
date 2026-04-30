import { movieApi } from "@/core/api/movie-api";
import { MovieMapper } from "@/infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";

interface Options{
    page?: number;
    limit?: number;
}

export const topRatedMoviesAction = async({page = 1, limit = 10}: Options) => {
    try {
        const { data } = await movieApi.get<MovieDBMoviesResponse>('/top_rated',{
            params: {
                page: page
            }
        })
        const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie));
        return movies;
    } catch (error) {
        console.log(error);
        throw "Cannot load top_rated movie";
        
    }
}