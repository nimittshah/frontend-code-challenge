<template>
  <div class="home container">
    <div id="tabs" class="row">
      <div
        class="tab all col-sm-6 col-lg-6"
        :class="{ selected: !isFavorite }"
        @click="selectTab(false)"
      >
        All
      </div>
      <div
        class="tab favorites col-sm-6 col-lg-6"
        :class="{ selected: isFavorite }"
        @click="selectTab(true)"
      >
        Favorites
      </div>
    </div>
    <div id="filters" class="row no-gutters">
      <div class="search-box-container col-sm col-lg mb-1 mb-sm-0">
        <input
          id="search-box"
          type="text"
          placeholder="Search"
          v-model="name"
          @input="filterByName()"
        />
      </div>
      <div class="type-container col-sm-4 col-lg-4">
        <select class="filter" v-model="type" @change="filterByType()">
          <option class="not-selected" :value="null" disabled hidden>
            Types
          </option>
          <option class="not-selected" :value="null">All</option>
          <option v-for="item in types" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="view-container col-sm-auto col-lg-auto">
        <div class="list" @click="changeView(true)"></div>
        <div class="grid" @click="changeView(false)"></div>
      </div>
    </div>

    <pokemon-list
      :pokemons="pokemons"
      :showAsList="showAsList"
      :isEvolutions="false"
      :isShowingFavorites="isFavorite"
    ></pokemon-list>
    <div v-if="isLoading" class="loading"></div>
  </div>
</template>
<style lang="scss">
#tabs {
  padding: 0 0.75rem;
  margin-top: 0.75rem;
  & .tab {
    height: 50px;
    border: 1px solid #71c1a1;
    color: #71c1a1;
    line-height: 50px;
    cursor: pointer;
    &.selected {
      background-color: #71c1a1;
      color: white;
    }
  }
}

#filters {
  padding: 12px 0;
  box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.2);

  & .view-container {
    height: 36px;
    padding-right: 5px;
  }
}

input#search-box,
select.filter {
  background-color: #eeeeee;
  width: 100%;
  height: 2.25rem;
  outline: none;
  border: none;
}
input#search-box {
  font-size: 0.825rem;
  padding: 0 12px;
}
select.filter {
  cursor: pointer;
}
.list,
.grid {
  width: 1.5rem;
  background-size: contain;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  height: 1.825rem;
  padding: 1px;
  height: 100%;
  cursor: pointer;
}

.list {
  background-image: url("./../assets/list.png");
  border-right: 1px solid #eeeeee;
  margin-right: 3px;
}

.grid {
  background-image: url("./../assets/grid.png");
}
</style>
<script>
import PokemonList from "../components/PokemonList.vue";

export default {
  components: { PokemonList },
  name: "Home",
  data() {
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
      }, 100);
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

              //Check for the length of pokemon list, if its greater or equal to the limit than only we will have chances to have more in DB.
              if (this.pokemons.length >= this.limit) {
                setTimeout(() => {
                  if (document.body.scrollHeight < window.outerHeight) {
                    this.getPokemons(false);
                  }
                }, 100);
              }
            } else {
              // On lazy load response, put all the new pokemons to the original list and show it on page
              this.pokemons = this.pokemons.concat(_response.pokemons.edges);
            }
          });
      } catch (error) {
        if (!initial) {
          this.offset -= this.limit;
        }
        console.error(error);
      }
    },
    getNextPokemons() {
      if (this.$route.name == "" || this.$route.name == "home") {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.getPokemons(false);
        }
      }
    },
    goToPokemon(_name) {
      this.$router.push(_name);
    },
  },
  beforeMount() {
    this.getPokemons(true);
  },
  mounted() {
    this.getPokemonTypes();
    console.log(this.$route.name);
    this.$nextTick(function () {
      window.addEventListener("scroll", this.getNextPokemons);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getNextPokemons);
  },
};
</script>
