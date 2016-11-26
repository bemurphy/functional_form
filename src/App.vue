<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Navbar
  }
}
</script>

<style>
  body {
    padding-top: 90px;
  }
</style>
