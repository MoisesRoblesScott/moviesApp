import useMovie from '@/presentation/hooks/useMovie';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

function MovieScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const { movieQuery } = useMovie(movieId);

  if (movieQuery.isLoading) return <Text>Cargando...</Text>;
  if (movieQuery.error) {
    console.log(movieQuery.error);
    return <Text className='{{ paddingVertical: 100, }}'>{JSON.stringify(movieQuery.error)}</Text>;
  }

  return (
    <ScrollView>
      <Text>{movieQuery.data?.title}</Text>
    </ScrollView>
  );
}

export default MovieScreen