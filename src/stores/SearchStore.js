import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useMovieStore } from "./MovieStore";

const url =
  "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movieStore = useMovieStore();
  const movies = ref([]);

  const isSearchedAddedMovies = computed(() => {
    if (movieStore.movies.length && movies.value.length) {
      movies.value.forEach((movie) => {
        movie.isAdded = false;
      });

      movieStore.movies.forEach((movie) => {
        const idx = movies.value.findIndex((el) => el.id === movie.id);
        movies.value[idx].isAdded = true;
      });
    }

    return movies.value;
  });

  const getMovies = async (search) => {
    loader.value = true;
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false;
  };

  return {
    loader,
    getMovies,
    isSearchedAddedMovies,
  };
});
