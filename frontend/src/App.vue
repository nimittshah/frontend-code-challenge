<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 12px;
}
.tab {
  width: 100%;
  height: 50px;
  border: 1px solid #71c1a1;
  color: #71c1a1;
  line-height: 50px;
  cursor: pointer;
}
.tab.selected {
  background-color: #71c1a1;
  color: white;
}
#filters {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 12px;
  box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.2);
}
.search-box-container {
  flex-grow: 7;
  margin-right: 2rem;
}
.type-container {
  flex-grow: 3;
  margin-right: 1rem;
}
.view-container {
  height: 36px;
  padding-right: 5px;
}
input#search-box,
select.filter {
  background-color: #eeeeee;
  width: 100%;
  height: 2rem;
  outline: none;
  border: none;
  padding: 5px 12px;
}
input#search-box {
  width: 100%;
  height: 2rem;
  font-size: 14px;
}
select.filter {
  width: 100%;
  padding: 12px;
  height: auto;
}
select option.not-selected {
  color: #a1a1a1;
}
.list,
.grid {
  width: 24px;
  background-size: contain;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  height: 30px;
  padding: 1px;
  height: 100%;
}

.list {
  background-image: url("./assets/list.png");
  border-right: 1px solid #eeeeee;
  margin-right: 3px;
}

.grid {
  background-image: url("./assets/grid.png");
}

#pokemons {
  & .grid-view {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: stretch;
    padding: 12px;
    gap: 12px;
    & .pokemon {
      border: 1px solid #eeeeee;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .img-container {
        flex-grow: 1;
        & img {
          width: 200px;
        }
      }
      & .details {
        text-align: left;
        width: 100%;
        background-color: #f3f3f3;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        & .more-details {
          padding: 10px;
        }
      }
    }
  }
}
</style>
