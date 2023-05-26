import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const activeTab = ref(2);

  const moviesInLocalStorage = localStorage.getItem("movies");
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value;
  }

  const watchedMovies = computed(() => {
    return movies.value.filter((movie) => movie.isWatched);
  });

  const setActiveTab = (id) => {
    activeTab.value = id;
  };

  const toggleWatched = (id) => {
    const idx = movies.value.findIndex((movie) => movie.id === id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  };

  const deleteMovie = (id) => {
    movies.value = movies.value.filter((movie) => movie.id !== id);
  };

  const addToUserMovies = (movie) => {
    movies.value.push({ ...movie, isWatched: false, isAdded: true });
  };

  watch(
    () => movies,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    movies,
    activeTab,
    watchedMovies,
    setActiveTab,
    toggleWatched,
    deleteMovie,
    addToUserMovies,
  };
});
