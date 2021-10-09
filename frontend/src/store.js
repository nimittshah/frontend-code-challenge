import axios from 'axios'
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const state = {
  pokemons: [],
  types: []
}
const getters = {
  pokemons: (state) => state.pokemons,
  types: (state) => { return state.types = state.pokemons.map(_pokemon => { return { 'type': _pokemon.type } }) }
}

const actions = {
  getPokemons({ commit }, req) {
    axios.post('pokemons', req)
      .then(response => {
        commit('SET_POKEMONS', response.data)
      })
  },

  getPokemon({ commit }, req) {
    axios.get('pokemon/' + req)
      .then(response => {
        commit('SET_POKEMON', response.data)
      })
  }
}
const mutations = {
  SET_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },

  SET_POKEMON(state, pokemon) {
    state.pokemon = pokemon;
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
