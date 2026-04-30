import { nowPlayingAction } from "@/core/actions/movies/now-playing.action"
import { popularMoviesAction } from "@/core/actions/movies/popular.action"
import { topRatedMoviesAction } from "@/core/actions/movies/top-rated.action"
import { upComingMoviesAction } from "@/core/actions/movies/upComing.action"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useMovies = () => {
    const nowPlayingQuery = useQuery({ 
        queryKey: ['movies', 'nowPlaying'], 
        queryFn: () => nowPlayingAction(),
        staleTime: 1000 * 60 * 60 * 24
    })

    const popularQuery = useQuery({ 
        queryKey: ['movies', 'popular'], 
        queryFn: () => popularMoviesAction(),
        staleTime: 1000 * 60 * 60 * 24
    })

    const topRatedQuery = useInfiniteQuery({ 
        initialPageParam: 1,
        queryKey: ['movies', 'topRated'], 
        queryFn: ({pageParam}) => {
            return topRatedMoviesAction({page: pageParam})
        },
        staleTime: 1000 * 60 * 60 * 24,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })

    const upComingQuery = useQuery({ 
        queryKey: ['movies', 'upComing'], 
        queryFn: () => upComingMoviesAction(),
        staleTime: 1000 * 60 * 60 * 24
    })

    return {
        nowPlayingQuery,
        popularQuery,
        topRatedQuery,
        upComingQuery
    }
}
