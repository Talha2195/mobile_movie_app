import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }), true);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
         }}
         className="mt-2 pb-32"
         scrollEnabled={true}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
          </>
        }
        renderItem={({ item }) => (
          <MovieCard 
          {...item}
          />
        )}
        ListEmptyComponent={
          moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text>Error: {moviesError}</Text>
          ) : null
        }
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}