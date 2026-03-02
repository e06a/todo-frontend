<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary col-xs-12">
    <span class="navbar-brand px-1"> <font-awesome-icon icon="clipboard-list" /> TodoLis </span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="justify-content-sm-end collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/todolist" class="nav-link" exactActiveLink="active">Todos</RouterLink>
        </li>
        <li>
          <RouterLink to="/register" class="nav-link" exactActiveLink="active">Register</RouterLink>
        </li>
        <li>
          <RouterLink to="/login" class="nav-link" exactActiveLink="active">Login</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>