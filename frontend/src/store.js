import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const state = {
  pokemons: [],
  types: [],
  sound: {}
}
const getters = {
  pokemons: (state) => state.pokemons,
}

const actions = {
  getSounds({ commit }, req) {
    console.log("Id : " + req);
    return axios.get('sounds/' + req, { responseType: 'arraybuffer' })
      .then(response => {
        commit('SET_POKEMON_SOUND', response.data)
        return response.data;
      })
  },
  getPokemons({ commit }, req) {
    return axios.post('graphql', req)
      .then(response => {
        commit('SET_POKEMONS', response.data.data.pokemons);
        return response.data.data;
      })
  },

  getPokemonByName({ commit }, req) {
    return axios.post('graphql', req)
      .then(response => {
        commit('SET_POKEMON', response.data);
        return response.data.data;
      })
  },

  getPokemonTypes({ commit }, req) {
    return axios.post('graphql', req, { responseType: 'application/json' }).then(response => {
      commit('SET_POKEMON_TYPES', response.data.data.pokemonTypes);
      return response.data.data;
    })
  },

  setFavoriteUnFavorite({ commit }, req) {
    return axios.post('graphql', req, { responseType: 'application/json' }).then(response => {
      return response;
    })
  }
}
const mutations = {
  SET_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },

  SET_POKEMON(state, pokemon) {
    state.pokemon = pokemon;
  },

  SET_POKEMON_SOUND(state, sound) {
    state.sound = sound;
  },
  SET_POKEMON_TYPES(state, types) {
    state.types = types;
  }
}
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
});
