<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <nav class="bg-slate-950 p-4 w-100 rounded-b-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-lg font-semibold">
        <a href="/">My Todo list</a>
      </div>
      <div class="space-x-4">
        <a
          v-if="route.path.includes('user')"
          href="/"
          class="text-gray-300 hover:text-white"
          >Home
        </a>
        <a v-else href="/user" class="text-gray-300 hover:text-white">User </a>
        <router-link
          to="/login"
          class="text-white bg-red-500 rounded-md p-2 hover:font-bold"
          >Disconect</router-link
        >
      </div>
    </div>
  </nav>
</template>