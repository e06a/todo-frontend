<script setup>
import axios from 'axios';
import {onMounted, onUpdated, reactive, ref} from "vue";
import TodoModal from "@/components/TodoModal.vue";

const token = localStorage.getItem("jwtToken");
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  window.location.href = '/login';
}

const data = reactive({
  todos : [],
  selectedToDo : {
    taskId : 0,
    title : null,
    description : null,
    completed : false
  },
  todoModalTitle: "ToDo hinzufügen",
  username: null,
  isEditing: false,
})

function deleteKeysOfCurrentTask() {
  Object.keys(data.selectedToDo).forEach(key => {
    delete data.selectedToDo[key]
  });
}

onMounted(() => {
  getToDos();
})

const todoModal = ref(null);
function getToDos() {
axios({
  method: 'get',
  url: 'http://localhost:8080/get/pending',
}).then((res) => {
  data.todos = res.data;
  console.log(res.data);
}).catch((err) => {
  console.log(err);
  window.location.href = '/login';
})
}

function editTask(task) {
  data.selectedToDo = Object.assign({}, task); // creates a clone of the object
  prepareDialog("Task bearbeiten", true)
}
function addTask() {
  prepareDialog("Task hinzufügen", false);
}
function saveTask() {
    let method;
    let path;
    if (data.isEditing) {
      method = 'put'
      path = "/update"
    } else {
      method = 'post'
      path = "/add"
    }

    axios({
      method: method,
      url: 'http://localhost:8080' + path,
      data: {
        taskId : data.selectedToDo.taskId,
        title : data.selectedToDo.title,
        description : data.selectedToDo.description,
        completed : data.selectedToDo.completed
      }
    }).then(res => {
      deleteKeysOfCurrentTask();
      getToDos();
      todoModal.value.hide();
      console.log(res.data);
    }).catch(err => {
      console.log(err);
      window.location.href = '/login';
    })
}

function checkTask(id) {
  axios({
    method: 'put',
    url: 'http://localhost:8080/check/' + id,
  }).then((res) => {
    getToDos();
  }).catch(err => {
    console.log(err);
    window.location.href = '/login';
  })
}

function prepareDialog(title, isEditing) {
  data.todoModalTitle = title;
  data.isEditing = isEditing;
  todoModal.value.show();
}
</script>

<template>
<h1>ToDo Liste</h1>
  <button type="button" class="btn btn-primary mt-5" @click="addTask">Erstellen</button>

  <table class="table table-striped mt-5">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Titel</th>
      <th>Beschreibung</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in data.todos">
      <td>{{row.taskId}}</td>
      <td>{{row.title}}</td>
      <td>{{row.description}}</td>
      <td>
        <font-awesome-icon icon="pen" style="color: #0091ff;" role="button" @click="editTask(row)"/>
      </td>
      <td>
        <font-awesome-icon icon="square-check" style="color: #0091ff;" role="button" @click="checkTask(row.taskId)"/>
      </td>
    </tr>
    </tbody>
  </table>

  <TodoModal ref="todoModal" :title="data.todoModalTitle" @keydown.esc="deleteKeysOfCurrentTask">
    <template #body>
      <div class="d-flex flex-column justify-content-center align-ites-center align-content-center">
        <label for="input-title">Titel</label>
        <input type="text" class="form-control" id="input-title" v-model="data.selectedToDo.title">
        <label for="input-description">Beschreibung</label>
        <input type="text" class="form-control" id="input-description" v-model="data.selectedToDo.description">
      </div>
    </template>
    <template #footer>
        <button type="button" class="btn btn-primary" @click="saveTask">Speichern</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteKeysOfCurrentTask">Close</button>
    </template>
  </TodoModal>

</template>

<style scoped>

</style>