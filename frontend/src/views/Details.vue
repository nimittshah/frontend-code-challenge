<template>
  <div id="pokemon-details" class="details container" v-if="!isLoading">
    <div class="pokemon-details">
      <div class="img-container">
        <img class="pokemon-img" :src="pokemon.image" />
        <div class="sound" @click="playSound(pokemon.id)"></div>
      </div>
      <div class="details">
        <div class="more-details">
          <div class="title">{{ pokemon.name }}</div>
          <div class="types">{{ pokemon.types }}</div>
        </div>
        <div
          class="favorite"
          :class="{ 'is-favorite': pokemon.isFavorite }"
          @click="setFavoriteUnFavorite($event, pokemon, !pokemon.isFavorite)"
        ></div>
        <div class="w-100 cp">
          <div class="bar"></div>
          <div class="numbers">CP: {{ pokemon.maxCP }}</div>
        </div>
        <div class="w-100 hp">
          <div class="bar"></div>
          <div class="numbers">HP: {{ pokemon.maxHP }}</div>
        </div>
      </div>
      <div class="extra-details">
        <div class="weight">
          <div class="title">Weight</div>
          <div class="numbers" v-if="pokemon.weight">
            {{
              (pokemon.weight.minimum || "") +
              " - " +
              (pokemon.weight.maximum || "")
            }}
          </div>
        </div>
        <div class="height">
          <div class="title">Height</div>
          <div class="numbers" v-if="pokemon.height">
            {{
              (pokemon.height.minimum || "") +
              " - " +
              (pokemon.height.maximum || "")
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="evolutions-container">
      <div class="title">Evolutions</div>
      <pokemon-list
        :pokemons="pokemon.evolutions"
        :showAsList="false"
        :isEvolutions="true"
        :isShowingFavorites="false"
      ></pokemon-list>
    </div>
  </div>
  <div v-else class="loading"></div>
</template>
<style  lang="scss">
#pokemon-details {
  .pokemon-details {
    display: grid;
    border: 1px solid #dadada;
    & .img-container {
      background-color: white;
      min-height: 250px;
      padding: 12px;
      position: relative;
      & img {
        min-height: 450px;
        min-width: 450px;
        max-height: 600px;
      }
      & .sound {
        position: absolute;
        bottom: 1.5rem;
        left: 1.5rem;
        width: 56px;
        height: 56px;
        background-image: url("./../assets/sound.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        cursor: pointer;
      }
    }
    & .details {
      text-align: left;
      width: 100%;
      background-color: #f3f3f3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      & .more-details {
        padding: 10px;
        flex-grow: 1;
        flex: 80%;

        & .title {
          font-weight: bold;
          font-size: 2rem;
        }

        & .types {
          font-size: 1rem;
        }
      }

      & .cp,
      .hp {
        flex: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 12px;
        & .bar {
          flex-grow: 1;
          border-radius: 10px;
        }
        & .numbers {
          font-weight: bold;
          margin-left: 1rem;
          width: 80px;
        }
      }

      & .cp {
        & .bar {
          border: 5px solid #96a0e0;
          background: #96a0e0;
        }
      }
      & .hp {
        & .bar {
          border: 5px solid #6eb16c;
          background: #6eb16c;
        }
      }
    }

    & .extra-details {
      background-color: #f3f3f3;
      border-top: 1px solid #dadada;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & .weight,
      .height {
        flex: 50%;
        padding: 1.5rem;
        & .title {
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }
      }

      & .weight {
        border-right: 1px solid #dadada;
      }
    }
  }

  .evolutions-container {
    margin-top: 1.5rem;
    text-align: left;
    & .title {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
}
</style>
<script>
import PokemonList from "../components/PokemonList.vue";

export default {
  components: { PokemonList },
  name: "Details",
  data() {
    return {
      pokemon: {},
      isFavorite: false,
      isLoading: false,
    };
  },
  methods: {
    getPokemonDetails() {
      //Get Pokemon detail for and show it on page.
      try {
        console.log(this.$route.params.name);
        this.isLoading = true;
        let _query =
          `query{ pokemonByName(name: "` +
          this.$route.params.name +
          `"){id, name, types, isFavorite, sound, image, weight {minimum, maximum}, height{minimum, maximum}, maxCP, maxHP, evolutions{id, name, image, isFavorite}}}`;
        this.$store
          .dispatch("getPokemonByName", { query: _query })
          .then((_response) => {
            this.isLoading = false;
            this.pokemon = _response.pokemonByName;
            this.pokemon.types = this.pokemon.types.toString();
          });
      } catch (error) {
        console.error(error);
      }
    },
    setFavoriteUnFavorite($event, _pokemon, _isFavorite) {
      //Set or unset Favorite item
      $event.stopPropagation();
      _pokemon.isFavorite = _isFavorite;

      try {
        let apiName = "favoritePokemon";
        if (!_isFavorite) {
          apiName = "unFavoritePokemon";
        }
        this.$store.dispatch("setFavoriteUnFavorite", {
          query: `mutation { ` + apiName + `(id: "` + _pokemon.id + `"){id} }`,
        });
      } catch (error) {
        console.error(error);
      }
    },
    playSound(_id) {
      //Play sound on click of sound button
      try {
        this.$store.dispatch("getSounds", parseInt(_id)).then((results) => {
          var blob = new Blob([results], {
            type: "audio/mp3",
          });
          var audio = new Audio(window.URL.createObjectURL(blob));
          audio.play();
        });
      } catch (error) {
        console.error(error);
      }
    },
    goToPokemon(_name) {
      this.$router.push(_name);
    },
  },
  beforeMount() {
    this.getPokemonDetails();
  },
  watch: {
    $route(to, from) {
      if (to != from) {
        this.getPokemonDetails();
      }
    },
  },
};
</script>

