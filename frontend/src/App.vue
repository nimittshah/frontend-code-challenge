<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  max-width: 1140px;
  margin: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
