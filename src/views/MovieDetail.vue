<template>
  <div class="flex-col">
    <modal name="rating-modal" height="auto" width="25%" :scrollable="true">
      <h1 class="p-2 font-bold flex items-center justify-center align-middle">
        Ratings
      </h1>
      <div class="p-1 flex items-center justify-center align-middle">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="border px-4 py-2">Source</th>
              <th class="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in movie.Ratings"
              :key="r.Source"
              class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
            >
              <td class="border px-4 py-2">{{ r.Source }}</td>
              <td class="border px-4 py-2">{{ r.Value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-2 flex items-center justify-center">
        <button
          @click="hide"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </modal>
    <div class="flex items-center justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <v-card>
        <div class="p-4 flex flex-col sm:flex-row justify-around items-center">
          <div class="flex flex-col items-center mr-10">
            <img
              :src="movie.Poster"
              :alt="movie.Title"
              class="w-32 md:w-64 lg:w-96"
            />
            <h1 class="font-bold">{{ movie.Title }} - {{ movie.Year }}</h1>
          </div>

          <div class="my-10 flex flex-col">
            <ul>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Description</b>
              </li>
              <li class="flex justify-between">
                <span>{{ movie.Plot }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Actors</b>
              </li>
              <li class="flex justify-between">
                <span>{{ movie.Actors }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Awards</b>
              </li>
              <li class="flex justify-between">
                <span>{{ movie.Awards }}</span>
              </li>
            </ul>
          </div>
        </div>
        <router-link
          :to="{ name: 'home' }"
          class="flex items-start justify-start"
          ><span class="p-5 text-green-500 cursor-pointer font-bold"
            >Back</span
          ></router-link
        >
      </v-card>
      <div class="p-2 my-10 sm:mt-0 flex justify-center text-center">
        <button
          @click="show"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Ratings
        </button>
      </div>
      <div>
        <v-textarea v-model="comment" color="teal">
          <template v-slot:label>
            <div>Please leave a comment <small>(optional)</small></div>
          </template>
        </v-textarea>
        <div class="p-2 my-10 sm:mt-0 flex justify-center text-center">
          <button
            @click="addComment"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Comment
          </button>
        </div>

        <v-list two-line subheader>
          <span class="font-extrabold">Comments</span>

          <v-list-item v-for="c in comments" :key="c">
            <v-list-item-content>
              <v-list-item-title>Comment (anonymous):</v-list-item-title>
              <span class="font-thin text-justify">{{ c }}</span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'MovieDetail',

  data() {
    return {
      isLoading: false,
      movie: {},
      modalOpen: false,
      comment: null,
      comments: []
    }
  },

  created() {
    this.getMovie()
  },

  methods: {
    getMovie() {
      const id = this.$route.params.id
      this.isLoading = true
      api
        .getMovie(id)
        .then(movie => (this.movie = movie))
        .finally(() => {
          this.isLoading = false
          this.getComments()
        })
    },
    show() {
      this.$modal.show('rating-modal')
    },
    hide() {
      this.$modal.hide('rating-modal')
    },
    addComment() {
      this.comments.push(this.comment)
      this.comment = null
      this.$localStorage.set(this.movie.imdbID, JSON.stringify(this.comments))
    },
    getComments() {
      const comments = JSON.parse(this.$localStorage.get(this.movie.imdbID))
      if (comments) {
        this.comments = comments
      }
    }
  }
}
</script>
