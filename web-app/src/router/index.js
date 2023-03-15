import { createRouter, createWebHashHistory } from 'vue-router'
import ShowsCrud from '../components/Shows.vue'
import HomeShows from '../components/Home.vue'
import Login from '../components/Login.vue'
import SeguindoShows from '../components/Seguindo.vue'
import store from '../store/index'
//rotas criadas
const routes = [
  {
    path: '/shows',
    name: 'shows',
    component: ShowsCrud,
    meta: {requiresAuth: true}//checa login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeShows,
    meta: {requiresAuth: true}//checa login
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/seguindo',
    name: 'seguindo',
    component: SeguindoShows,
    meta: {requiresAuth: true}//checa login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // rota checa se precisa de login
    if (!store.getters.isLoggedIn) {
      //se n estiver logado, manda usuario para rota login
      next({ name: 'login' })
    } else {
      next() // vai para rota
    }
  } else {
    next() // caso não precise checar login
  }
})
export default router
