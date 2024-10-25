<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  description: String,
  state: Number,
});

defineEmits(["delete"]);

function getColor() {
  return {
    "bg-red-200": props.state === 1,
    "bg-yellow-200": props.state === 2,
    "bg-green-200": props.state === 3,
  };
}
</script>

<template>
  <div class="p-6 rounded-md shadow-sm text-black relative" :class="getColor()">
    <h1 class="text-2xl font-semibold mb-6">{{ title }}</h1>
    <p>{{ description }}</p>
    <button
      class="bg-red-500 text-white p-2 rounded-md absolute shadow-md top-1 right-1 hover:p-3 hover:font-bold duration-100"
      @click="$emit('delete')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>