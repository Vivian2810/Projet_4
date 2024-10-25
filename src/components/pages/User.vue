<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../Navbar.vue";

const user = ref({
  name: "",
  email: "",
  photo: "https://via.placeholder.com/150", // URL de l'image par défaut
});

onMounted(() => {
  const userFromLocalStorage = localStorage.getItem("user");
  if (userFromLocalStorage) {
    user.value = JSON.parse(userFromLocalStorage);
  }
});

const updateProfile = () => {
  localStorage.setItem("user", JSON.stringify(user.value));
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.photo = e.target.result; // Met à jour la photo de profil
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <Navbar />
  <div class="m-10 p-6 bg-slate-950 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Modifier le Profil</h2>
    <form @submit.prevent="updateProfile">
      <div class="flex justify-between items-center">
        <div class="w-2/3">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-300"
              >Nom</label
            >
            <input
              type="text"
              id="name"
              v-model="user.name"
              class="mt-1 p-2 bg-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-300"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="user.email"
              class="mt-1 p-2 bg-gray-300 rounded-md w-full"
              required
            />
          </div>
        </div>
        <div class="mb-4 w-1/4 flex flex-col items-center">
          <img
            :src="user.photo"
            alt="Photo de profil"
            class="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <button
            type="button"
            @click="$refs.fileInput.click()"
            class="mt-1 p-2 bg-red-400 rounded-md w-full"
          >
            Changer la photo
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="onFileChange"
            accept="image/*"
            class="hidden"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-1/3 mt-5 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Enregistrer
      </button>
    </form>
  </div>
</template>
