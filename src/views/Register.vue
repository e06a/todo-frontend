<script setup>

import {reactive} from "vue";
import axios from "axios";

const data = reactive({
  firstname : "",
  lastname : "",
  email: "",
  password: ""
})

function register() {
  axios({
    method: "post",
    url: "http://localhost:8080/auth/register",
    data: {
      firstname : data.firstname,
      lastname : data.lastname,
      email: data.email,
      password: data.password
    }
  }).then(res => {
    data.email = "";
    data.password = "";
    localStorage.setItem("jwtToken", res.data);
    window.location.href = '/login';
  }).catch(err => {
    console.log(err);
  })
}

</script>

<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="w-50">
      <div class="form-group">
        <label for="firstnameInput">firstname</label>
        <input type="text" class="form-control" id="firstnameInput" aria-describedby="emailHelp"
               placeholder="Enter firstname" v-model="data.firstname">
      </div>
      <div class="form-group">
        <label for="lastnameInput">lastname</label>
        <input type="text" class="form-control" id="lastnameInput" aria-describedby="emailHelp"
               placeholder="Enter lastname" v-model="data.lastname">
      </div>
      <div class="form-group">
        <label for="emailInput">Email address</label>
        <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"
               placeholder="Enter email" v-model="data.email">
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="data.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mt-1" @click="register">Registrieren</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>