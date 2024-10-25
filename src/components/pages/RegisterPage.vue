<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";

export default {
  name: "RegisterPage",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      validationErrors: {},
      isSubmitting: false,
    };
  },
  created() {
    if (
      localStorage.getItem("token") != "" &&
      localStorage.getItem("token") != null
    ) {
      this.$router.push("/mytodolist");
    }
  },
  methods: {
    async registerAction() {
      this.isSubmitting = true;
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      };
      axios
        .post("/api/register", payload)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/mytodolist");
          return response;
        })
        .catch((error) => {
          this.isSubmitting = false;
          if (error.response.data.errors != undefined) {
            this.validationErrors = error.response.data.errors;
          }
          return error;
        });
    },
  },
};
</script>
 
<template>
  <layout-div>
    <div class="flex justify-center mt-12">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h5 class="text-lg font-bold text-gray-800 mb-4">Inscription</h5>
          <form>
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-1">
                Nom
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                name="name"
                v-model="name"
              />
              <div v-if="validationErrors.name" class="text-red-600 mt-1">
                <small>{{ validationErrors?.name[0] }}</small>
              </div>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                name="email"
                v-model="email"
              />
              <div v-if="validationErrors.email" class="text-red-600 mt-1">
                <small>{{ validationErrors?.email[0] }}</small>
              </div>
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 font-medium mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                name="password"
                v-model="password"
              />
              <div v-if="validationErrors.password" class="text-red-600 mt-1">
                <small>{{ validationErrors?.password[0] }}</small>
              </div>
            </div>
            <div class="mb-4">
              <label
                for="confirm_password"
                class="block text-gray-700 font-medium mb-1"
              >
                Confirmer Mot de Passe
              </label>
              <input
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="confirm_password"
                name="confirm_password"
                v-model="confirmPassword"
              />
            </div>
            <div class="flex flex-col space-y-4">
              <button
                :disabled="isSubmitting"
                @click="registerAction()"
                type="button"
                class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Inscription
              </button>
              <p class="text-center text-gray-600">
                Vous avez déjà un compte ?
                <router-link to="/" class="text-blue-500 hover:underline">
                  Connecte toi ici
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </layout-div>
</template>