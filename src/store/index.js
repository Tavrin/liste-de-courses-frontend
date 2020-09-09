import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listes:[],
    produits:[],
    user: null,
    currentListe: null,
    error: ''
  },
  mutations: {
    setListes(state,arr){
      state.listes = arr;
    },
    setProduits(state,arr){
      state.produits = arr;
    },
    setError(state,msg){
      state.error = msg;
    },
    setCurrentUser(state,id){
      state.user = id
    },
    setCurrentListe(state,id){
      state.currentListe = id
    }

  },
  actions: {
  },
  modules: {
  }
})
