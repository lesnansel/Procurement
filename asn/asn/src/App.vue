<template>
  <div id="app">
    <header class="app-header">
      <Logo />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// import Logo from '@/components/Logo.vue'

// export default {
//   name: 'App',
//   components: {
//     Logo
//   }
// }
</script>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-header {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style> -->
