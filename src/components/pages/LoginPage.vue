<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";

export default {
  name: "LoginPage",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      email: "",
      password: "",
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
    loginAction() {
      this.isSubmitting = true;
      let payload = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/login", payload)
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
          if (error.response.data.error != undefined) {
            this.validationErrors = error.response.data.error;
          }
          return error;
        });
    },
  },
};
</script>
 
<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h5 class="text-lg font-semibold text-gray-800 mb-4">Sign In</h5>
        <form>
          <p
            v-if="Object.keys(validationErrors).length != 0"
            class="text-center text-red-600 mb-4"
          >
            <small>Incorrect Email or Password</small>
          </p>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-1">
              Email address
            </label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              name="email"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
            />
          </div>
          <div class="flex flex-col space-y-4">
            <button
              :disabled="isSubmitting"
              @click="loginAction()"
              type="button"
              class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
            <p class="text-center text-gray-600">
              Don't have an account?
              <router-link to="/register" class="text-blue-500 hover:underline">
                Register here
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>