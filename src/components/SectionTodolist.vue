<script setup>
import Card from "./Card.vue";
import { ref } from "vue";

const title = ref("");
const description = ref("");
const state = ref("");
const todos = ref(
  localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
);

function addTache() {
  todos.value.push({
    id: todos.value.length + 1,
    title: title.value,
    description: description.value,
    state: state.value,
  });
  title.value = "";
  description.value = "";
  state.value = "";
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

function deleteTache(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
</script>

<template>
  <div class="w-full p-5">
    <h1 class="text-xl font-bold">My toDo List</h1>
    <div class="w-full flex mt-10">
      <input
        v-model="title"
        type="text"
        class="bg-gray-300 opacity-90 text-black p-2 rounded-md w-full"
        placeholder="Title"
      />
      <input
        v-model="description"
        type="text"
        class="bg-gray-300 opacity-90 text-black p-2 rounded-md w-full mx-2"
        placeholder="Description"
      />
      <select
        v-model="state"
        :options="[1, 2, 3]"
        class="bg-gray-300 opacity-90 text-black p-2 rounded-md w-full mx-2"
      >
        <option :value="1">High</option>
        <option :value="2">Medium</option>
        <option :value="3">Low</option>
      </select>
      <button
        class="bg-blue-500 text-white p-2 rounded-md w-full"
        @click="addTache"
      >
        Ajout
      </button>
    </div>
  </div>
  <!-- list Card -->
  <div class="grid grid-cols-4 gap-4 p-5">
    <Card
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :description="todo.description"
      :state="todo.state"
      @delete="deleteTache(todo.id)"
    />
  </div>
</template>
