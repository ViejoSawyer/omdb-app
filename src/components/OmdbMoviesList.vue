<template>
  <v-container fluid grid-list-xl>
    <div class="flex items-center justify-center">
      <div :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
        <span class="underline cursor-pointer" @click="changeSortOrder"
          >Year</span
        >
      </div>
    </div>
    <v-layout wrap justify-space-around>
      <v-flex v-for="m in orderedMovies" :key="m.imdbID">
        <v-card class="mx-auto" max-width="400">
          <v-img height="200px" :src="m.Poster" />
          <v-card-title class="w-64 truncate">{{ m.Title }}</v-card-title>
          <v-card-text>
            <div>Year: {{ m.Year }}</div>
            <div>Type: {{ m.Type }}</div>
            <div>IMDB id: {{ m.imdbID }}</div>
          </v-card-text>
          <v-card-actions class="flex items-center justify-center">
            <omdb-button @custom-click="goToMovie(m.imdbID)">
              <span>Detail</span>
            </omdb-button>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OmdbButton from '@/components/OmdbButton'

export default {
  name: 'OmdbMoviesList',

  components: { OmdbButton },

  data() {
    return {
      sortOrder: 1
    }
  },

  props: {
    movies: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    orderedMovies() {
      const altOrder = this.sortOrder === 1 ? -1 : 1
      return this.movies.slice(0).sort((a, b) => {
        if (parseInt(a.Year) > parseInt(b.Year)) {
          return this.sortOrder
        }
        return altOrder
      })
    }
  },

  methods: {
    goToMovie(id) {
      this.$router.push({ name: 'movie-detail', params: { id } })
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
