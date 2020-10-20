<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <Home msg="Welcome to Your Vue.js App"/>-->
    <Home></Home>
  </div>
</template>

<script>
import Home from './components/home'
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  max-width: 100%;
  height: 100%;
  overflow-x: hidden;
  color: #fff;
  background-color: #050303;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*!*text-align: center;*!*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
