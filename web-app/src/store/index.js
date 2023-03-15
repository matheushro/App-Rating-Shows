import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  //dados
  state: {
    user: [],//dados user
    token: [],//token login
    shows: [], //dados shows
    showsUser: [],//dados shows do usuario logado
    carregarShowsUser: [],//carega dados
  },
  //getter check se user logado
  getters: {
    //verifica login
    isLoggedIn(state){
      return state.token[0] ? true : false;

    }
  },
  //set state 
  mutations: {
    //set user no login
    setUser(state, user){
      state.user = user;
      
    },
    //set token de login
    setToken(state, token){
      state.token = token;
    },
    //carrega todos os posts
    carregarShows (state, carregarShows) {
      state.carregarShows = carregarShows;
    },
    //carrega posts do usuario logado
    carregarShowsUser (state, carregarShowsUser) {
      state.carregarShowsUser = carregarShowsUser;
    },
    //carrega posts que user segue
    carregarShowsSeguindo (state, carregarShowsSeguindo) {
      state.carregarShowsSeguindo = carregarShowsSeguindo;
    }
  },
  //busca pela rota backend
  actions: {
    //busca no backend feed show
    carregarShows({ commit }) {
      axios
      .get('http://localhost:3000/home/')
      .then(response => {
        commit('carregarShows', response.data.dados);
      })
    },
    //busca no backend shows do user
    carregarShowsUser({ commit, state }) {
      axios
      .get('http://localhost:3000/shows/' + state.user.id_user)
      .then(response => {
        commit('carregarShowsUser', response.data.dados);
      })
    },
    //busca no backend shows que user segue
    carregarShowsSeguindo({ commit, state }) {
      axios
      .get('http://localhost:3000/shows/seguindo/' + state.user.id_user)
      .then(response => {
        commit('carregarShowsSeguindo', response.data.dados);
      })
    },
  },
  modules: {
  }
})
