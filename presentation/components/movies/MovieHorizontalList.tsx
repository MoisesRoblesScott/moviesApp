import { Movie } from '@/infrastructure/interfaces/movie.interface';
import { useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;
  loadNextPage?: any
}

const MovieHorizontalList = ({movies, title, className, loadNextPage}: Props) => {

  const isLoading = useRef(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(isLoading.current) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;
    if(!isEndReached) return;

    isLoading.current = true;
    loadNextPage && loadNextPage();
    isLoading.current = false; 
  }

  return (
    <View className={`${className}`}>
      {title && <Text className="text-2xl font-bold px-4 mb-2" >{title} </Text>}
      <FlatList 
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={({item}) => <MoviePoster id={item.id} poster={item.poster} smallPoster={true} /> }
        onScroll={onScroll}
      />
    </View>
  )
}

export default MovieHorizontalList