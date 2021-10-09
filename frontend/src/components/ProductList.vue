<template>
  <div class="products">
    <ul id="example-1">
      <!-- <li v-for="item in list" :key="item.id">
        {{ item.message }}
      </li> -->
    </ul>
  </div>
</template>


<script>
export default {
  name: "ProductList",
  props: {
    showFavorite: Boolean,
    search: String,
    filterBy: String,
    isList: Boolean,
  },

  /* data() {
    return {
      chartOptions: {
        series: [
          {
            type: "pie",
            name: "Browser share",
            data: [
              ["Firefox", 45.0],
              ["IE", 76.8],
              ["Safari", 8.5],
              ["Opera", 6.2],
              ["Others", 0.7],
            ],
          },
        ],
      },
    };
  }, */
};
</script>