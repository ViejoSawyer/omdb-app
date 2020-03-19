import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MovieDetail from '@/views/MovieDetail'
import Error from '@/views/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetail
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
