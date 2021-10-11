<template>
  <div class="home">
    <div id="tabs">
      <div
        class="tab all"
        :class="{ selected: !isFavorite }"
        @click="selectTab(false)"
      >
        All
      </div>
      <div
        class="tab favorites"
        :class="{ selected: isFavorite }"
        @click="selectTab(true)"
      >
        Favorites
      </div>
    </div>
    <div id="filters">
      <div class="search-box-container">
        <input
          id="search-box"
          type="text"
          placeholder="Search"
          v-model="name"
          @input="filterByName()"
        />
      </div>
      <div class="type-container">
        <select class="filter" v-model="type" @change="filterByType()">
          <option class="not-selected" :value="null" disabled hidden>
            Types
          </option>
          <option class="not-selected" :value="null">All</option>
          <option v-for="item in types" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="view-container">
        <div class="list" @click="changeView(true)"></div>
        <div class="grid" @click="changeView(false)"></div>
      </div>
    </div>

    <pokemon-list
      :pokemons="pokemons"
      :showAsList="showAsList"
      :isEvolutions="false"
    ></pokemon-list>
    <div v-if="isLoading" class="loading"></div>
  </div>
</template>

<script>
import PokemonList from "../components/PokemonList.vue";

export default {
  components: { PokemonList },
  name: "Home",
  data() {
    this.getPokemonTypes();
    return {
      pokemons: [],
      types: [],
      isFavorite: false,
      name: "",
      type: null,
      showAsList: false,
      offset: 0,
      limit: 10,
      isLoading: false,
    };
  },
  methods: {
    selectTab(_showFavorite) {
      //Change the view to show All or Favorite
      this.isFavorite = _showFavorite;
      this.getPokemons(true);
    },
    filterByName() {
      //Call this method on Search
      this.getPokemons(true);
    },
    filterByType() {
      //Call this method on type change.
      this.getPokemons(true);
    },
    changeView(_val) {
      //Call this method on List view or Grid view.
      this.showAsList = _val;
      setTimeout(() => {
        if (document.body.scrollHeight < window.outerHeight) {
          this.getPokemons(false);
        }
      }, 500);
    },
    getPokemonTypes() {
      //Get all the pokemon Types and show it in the dropdown!
      try {
        this.$store
          .dispatch("getPokemonTypes", { query: ` { pokemonTypes}` })
          .then((_resp) => {
            this.types = _resp.pokemonTypes.sort();
          });
      } catch (error) {
        console.error(error);
      }
    },
    getPokemons(initial = true) {
      //Get all the pokemons initially and also on the scroll
      if (initial) {
        this.offset = 0;
      } else {
        this.offset += this.limit;
      }
      try {
        this.isLoading = true;
        let _query =
          ` { pokemons(query: { limit: ` +
          this.limit +
          `, offset: ` +
          this.offset +
          `, search:"` +
          this.name +
          `", filter:{type:"` +
          (this.type || "") +
          `", isFavorite: ` +
          this.isFavorite +
          `}}) { edges { id, name, types, isFavorite, sound,  image} } }`;

        this.$store
          .dispatch("getPokemons", { query: _query })
          .then((_response) => {
            this.isLoading = false;
            if (initial) {
              this.pokemons = _response.pokemons.edges;
              if (this.pokemons.length >= this.limit) {
                setTimeout(() => {
                  if (document.body.scrollHeight < window.outerHeight) {
                    this.getPokemons(false);
                  }
                }, 500);
              }
            } else {
              this.pokemons = this.pokemons.concat(_response.pokemons.edges);
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    getNextPokemons() {
      window.onscroll = () => {
        if (this.$route.name == "" || this.$route.name == "home") {
          let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            this.getPokemons(false);
          }
        }
      };
    },
    goToPokemon(_name) {
      this.$router.push(_name);
    },
  },
  beforeMount() {
    this.getPokemons(true);
  },
  mounted() {
    console.log(this.$route.name);
    this.getNextPokemons();
  },
};
</script>
