<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  width: 1140px;
  margin: auto;
}
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
  padding: 0 0.75rem;
  margin-top: 0.75rem;
  & .tab {
    width: 100%;
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
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 12px;
  box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.2);
  & .search-box-container {
    flex-grow: 7;
    margin-right: 2rem;
  }
  & .type-container {
    flex-grow: 3;
    margin-right: 1rem;
  }
  & .view-container {
    height: 36px;
    padding-right: 5px;
  }
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
  font-size: 0.825rem;
}
select.filter {
  width: 100%;
  padding: 0.75rem;
  height: auto;
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
  background-image: url("./assets/list.png");
  border-right: 1px solid #eeeeee;
  margin-right: 3px;
}

.grid {
  background-image: url("./assets/grid.png");
}

.flex-grow {
  flex-grow: 1;
}
.favorite {
  position: relative;
  width: 3rem;
  height: 1rem;
  cursor: pointer;

  &.is-favorite.favorite.is-favorite:before,
  &.is-favorite.favorite.is-favorite:after {
    background: red;
  }
  &:before,
  &:after {
    background: #f3f3f3;
    border: 2px solid red;
    border: solid 2px red;
    position: absolute;
    content: "";
    left: 0.75rem;
    top: 0;
    width: 0.6675rem;
    height: 1.125rem;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  &:after {
    left: 0;
    border-left: 0px;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
}
.no-data {
  margin: 2rem 0;
}
.loading {
  background: transparent url("./assets/loading.gif") center no-repeat;
  height: 64px;
  width: 100%;
}
</style>
