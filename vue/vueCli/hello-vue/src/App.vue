<template>
  <div id="app">
    <div id="nav">
      <a href="#about/abc">abcaa</a>
      <router-link to="/">Home</router-link> |
      <router-link to="/about/abc">About</router-link>
    </div>
    <router-view name="a" />
    <router-view />
  </div>
</template>
<script>
export default {
  beforeRouteUpdate() {
    console.log("路由更新");
  },
  watch: {
    $route() {
      console.log("路由信息发生变化");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
