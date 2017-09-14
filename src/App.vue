<template>
  <div id="app">
    <loading></loading>
    <navbar></navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer></v-footer>
    <back-top></back-top>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  import BackTop from './components/BackTop'
  import Loading from './components/Loading'

  export default {
    components: {
      Navbar,
      BackTop,
      'v-footer': Footer,
      Loading
    }
  }
</script>

<style>
  #app {
    background: #e1e1e1;
  }
</style>
