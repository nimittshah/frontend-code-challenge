<template>
  <div id="pokemons">
    <div
      class="view"
      :class="{
        'list-view': showAsList,
        'grid-view': !showAsList,
        evolutions: isEvolutions,
      }"
      v-if="pokemons.length > 0"
    >
      <div
        class="pokemon flex-grow"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="goToPokemon(pokemon.name)"
      >
        <div class="img-container">
          <img class="pokemon-img" :src="pokemon.image" />
        </div>
        <div class="details">
          <div class="more-details">
            <div class="title">{{ pokemon.name }}</div>
            <div class="types" v-if="pokemon.types">
              {{ pokemon.types.toString() }}
            </div>
          </div>
          <div
            class="favorite"
            :class="{ 'is-favorite': pokemon.isFavorite }"
            @click="setFavoriteUnFavorite($event, pokemon, !pokemon.isFavorite)"
          ></div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">No data found!</div>
  </div>
</template>

<style lang="scss">
#pokemons {
  & .view {
    display: grid;
    padding: 12px;
    gap: 12px;
    &.evolutions {
      padding: 12px 0;
    }
    & .pokemon {
      border: 1px solid #dadada;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & .img-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-grow: 1;
        background-color: white;
      }
      & .details {
        text-align: left;
        width: 100%;
        background-color: #f3f3f3;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & .more-details {
          padding: 10px;

          & .title {
            font-weight: bold;
          }

          & .types {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
  & .grid-view {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    & .pokemon {
      flex-direction: column;
      & .img-container {
        min-height: 250px;
        & img {
          max-height: 200px;
          max-width: 200px;
        }
      }
    }
  }

  & .list-view {
    grid-template-columns: 1fr;
    & .pokemon {
      flex-direction: row;
      & .img-container {
        height: 50px;
        width: 50px;
        & img {
          max-height: 50px;
          max-width: 50px;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "PokemonList",
  props: {
    pokemons: Array,
    showAsList: Boolean,
    isEvolutions: Boolean,
  },
  data() {
    return { isFavorite: false, name: "", type: null };
  },
  methods: {
    async setFavoriteUnFavorite($event, _pokemon, _isFavorite) {
      $event.stopPropagation();
      _pokemon.isFavorite = _isFavorite;

      try {
        console.log(_pokemon.id);
        let apiName = "favoritePokemon";
        if (!_isFavorite) {
          apiName = "unFavoritePokemon";
        }
        this.$store
          .dispatch("setFavoriteUnFavorite", {
            query:
              `mutation { ` +
              apiName +
              `(id: "` +
              _pokemon.id +
              `"){ id, name, types, isFavorite, sound,  image} }`,
          })
          .then((_resp) => {
            console.log("set " + apiName);
          });
      } catch (error) {
        console.error(error);
      }
    },
    goToPokemon(_name) {
      this.$router.push(_name);
    },
  },
};
</script>