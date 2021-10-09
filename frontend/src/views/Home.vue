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
        <input id="search-box" type="text" placeholder="Search" />
      </div>
      <div class="type-container">
        <select class="filter" v-model="type">
          <option class="not-selected" :value="null" disabled>Types</option>
          <option v-for="item in types" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="view-container">
        <div class="list" @click="showAsList = true"></div>
        <div class="grid" @click="showAsList = false"></div>
      </div>
    </div>

    <div id="pokemons">
      <div :class="{ 'list-view': showAsList, 'grid-view': !showAsList }">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id">
          <div class="img-container">
            <img class="pokemon-img" :src="pokemon.image" />
          </div>
          <div class="details">
            <div class="more-details">
              <div class="title">{{ pokemon.name }}</div>
              <div class="type">{{ pokemon.types.toString() }}</div>
            </div>
            <div
              class="favorite"
              @click="pokemon.isFavorite = !pokemon.isFavorite"
            >
              {{ pokemon.isFavorite }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      pokemons: [],
      types: [],
      isFavorite: false,
      type: null,
      showAsList: false,
    };
  },
  methods: {
    selectTab(_showFavorite) {
      this.isFavorite = _showFavorite;

      this.mounted();
    },
  },
  computed: {
    getPokemons() {
      console.log(this.$store.state.pokemons);
      return this.$store.state.pokemons.edges;
    },

    filterTypes() {
      console.log(this.$store.state.types);
      /*  return this.data.map((dt) => {
        type: dt.type;
      }); */
    },
  },
  async mounted() {
    try {
      let results = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query:
            ` { pokemons(query: { limit: 10, offset: 0, search:"", filter:{type:"` +
            (this.type || "") +
            `", isFavorite: ` +
            this.isFavorite +
            `}}) { edges { id, name, types, isFavorite, sound,  image} } }`,
        },
      });
      this.pokemons = results.data.data.pokemons.edges;
      this.types = JSON.parse(JSON.stringify(this.pokemons)).map(
        (_pokemon) => _pokemon.types
      );
      this.types = this.types.toString().split(",");
      this.types = [...new Set(this.types)];
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
