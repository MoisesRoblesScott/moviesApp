import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainSlideshow from '@/presentation/components/movies/MainSlideshow';
import MovieHorizontalList from '@/presentation/components/movies/MovieHorizontalList';
import { useMovies } from '@/presentation/hooks/useMovies';


const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    const { nowPlayingQuery, popularQuery, topRatedQuery, upComingQuery } = useMovies();

    if(nowPlayingQuery.isLoading){
        return (
            <View className="justify-center items-center flex-1">
                <ActivityIndicator color='purple' size={50}/>
            </View>
        )
    }

    return (
        <ScrollView>
            <View className='mt-2 pb-10' style={{ paddingTop: safeArea.top }}>
                <Text className='text-3xl font-bold px-4 mb-2'>Movies App</Text>

                {/* carousel de imagenes */}
                <MainSlideshow movies={ nowPlayingQuery.data ?? [] } />

                {/* Populares */}
                <MovieHorizontalList title='Populares' movies={ popularQuery.data ?? [] } className="mb-5"/>

                {/* Mejor calificacion */}
                <MovieHorizontalList 
                    title='Mejor Calificacion' 
                    movies={ topRatedQuery.data?.pages.flat() ?? [] } 
                    className="mb-5"
                    loadNextPage={topRatedQuery.fetchNextPage}
                />

                {/* Proximamente en cines */}
                <MovieHorizontalList title='Próximamente en cines' movies={ upComingQuery.data ?? [] } className="mb-5"/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen