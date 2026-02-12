<script setup>
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <header>
    <Navigation/>
  </header>

  <RouterView />
  <footer class="footer">
    <p>footer</p>
  </footer>
</template>

<style scoped>
.footer {
  height: 100px;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
}

</style>
