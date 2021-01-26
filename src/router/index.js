import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import Ranking from '../views/Ranking.vue';

Vue.use(VueRouter)

/**
 * URL routes map
 */
export const mapRoutes = {
  round: "question",
  ranking: "fin-partie"
}

/**
 * Routes declaration
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: `/${mapRoutes.round}/:id`,
    name: 'Game',
    component: Game
  },
  {
    path: `/${mapRoutes.ranking}`,
    name: 'Ranking',
    component: Ranking
  }
]
const router = new VueRouter({
  routes
})

export default router;
