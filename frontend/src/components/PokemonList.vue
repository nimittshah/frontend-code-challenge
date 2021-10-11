<template>
  <div>
    <div id="pokemons" class="row">
      <div class="col">
        <div
          class="view row"
          :class="{
            'list-view': showAsList,
            'grid-view': !showAsList,
            evolutions: isEvolutions,
          }"
          v-if="pokemons.length > 0"
        >
          <div
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :class="{
              'col-12': showAsList,
              'col-lg-3 col-md-4 col-12': !showAsList,
            }"
          >
            <div
              class="pokemon row justify-content-around align-items-end"
              @click="goToPokemon(pokemon.name)"
            >
              <div
                class="img-container text-center"
                :class="{ 'col-1': showAsList, 'col-12': !showAsList }"
              >
                <img class="pokemon-img" :src="pokemon.image" />
              </div>
              <div
                class="details"
                :class="{ col: showAsList, 'col-12': !showAsList }"
              >
                <div class="more-details row align-items-center">
                  <div class="col">
                    <div class="title">{{ pokemon.name }}</div>
                    <div class="types" v-if="pokemon.types">
                      {{ pokemon.types.toString() }}
                    </div>
                  </div>
                  <div
                    class="favorite col-auto"
                    :class="{ 'is-favorite': pokemon.isFavorite }"
                    @click="
                      setFavoriteUnFavorite(
                        $event,
                        pokemon,
                        !pokemon.isFavorite
                      )
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">No data found!</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#pokemons {
  & .view {
    padding: 12px 0;
    &.evolutions {
      padding: 12px 0;
    }
    & .pokemon {
      border: 1px solid #dadada;
      cursor: pointer;
      & .img-container {
        background-color: white;
      }
      & .details {
        text-align: left;
        background-color: #f3f3f3;

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
    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
      grid-template-columns: 1fr 1fr;
    }
    & .pokemon {
      margin: 12px 0px;
      min-height: 310px;
      & .img-container {
        & img {
          max-height: 200px;
          max-width: 200px;
          height: auto;
          @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
            max-width: 160px;
          }
          @media only screen and (min-device-width: 54px) and (max-device-width: 540px) and (-webkit-min-device-pixel-ratio: 2) {
            max-width: 160px;
          }
        }
      }
    }
  }

  & .list-view {
    & .pokemon {
      margin-bottom: 12px;
      & .img-container {
        height: 50px;
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
    isShowingFavorites: Boolean,
  },
  data() {
    return { isFavorite: false, name: "", type: null };
  },
  methods: {
    async setFavoriteUnFavorite($event, _pokemon, _isFavorite) {
      //Set or unset Favorite item
      $event.stopPropagation();
      _pokemon.isFavorite = _isFavorite;

      try {
        console.log(_pokemon.id);
        let apiName = "favoritePokemon";
        if (!_isFavorite) {
          apiName = "unFavoritePokemon";
          if (this.isShowingFavorites) {
            let ind = this.pokemons.findIndex(
              (pokemon) => pokemon.id == _pokemon.id
            );
            this.pokemons.splice(ind, 1);
          }
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