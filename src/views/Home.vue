<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <div class="w-full" v-if="!isLoading">
      <div class="flex items-center justify-center">
        <input
          class="mb-3 mr-3 w-1/2 bg-gray-100 focus:outline-none border border-gray-400 py-2 px-4 block appearance-none leading-normal"
          id="search"
          placeholder="Search movie..."
          type="text"
          v-model="search"
        />
        <omdb-button
          class="inline-block align-baseline mb-3"
          @custom-click="searchMovie"
        >
          <span>Search</span>
        </omdb-button>
      </div>
      <div class="flex items-center justify-center">
        <omdb-movies-list v-if="movies.length > 0" :movies="movies" />
        <div v-else>
          <span class="text-gray-600 text-lg">{{ errorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import OmdbMoviesList from '@/components/OmdbMoviesList'
import OmdbButton from '@/components/OmdbButton'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Home',
  components: { OmdbMoviesList, OmdbButton },

  data() {
    return {
      isLoading: false,
      alert: true,
      errorMessage: 'Search your favorite movie 😉',
      movies: []
    }
  },

  computed: {
    // The `mapFields` function takes an array of
    // field names and generates corresponding
    // computed properties with getter and setter
    // functions for accessing the Vuex store.
    ...mapFields(['search'])
  },
  methods: {
    searchMovie() {
      if (this.search.length > 0) {
        this.isLoading = true
        api
          .getMovies(this.search)
          .then(movies => {
            if (movies.Response === 'True') {
              this.movies = movies.Search
            } else {
              this.movies = []
              this.errorMessage = movies.Error
            }
          })
          .finally(() => (this.isLoading = false))
      }
    }
  },
  created() {
    this.searchMovie()
  }
}
</script>
