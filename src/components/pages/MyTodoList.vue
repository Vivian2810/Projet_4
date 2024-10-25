<script>
import axios from "axios";
import SectionTodolist from "../SectionTodolist.vue";

export default {
  name: "MyTodoList",
  components: {
    SectionTodolist,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUser();
    if (
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    )
      this.$router.push("/");
    else this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get("/api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((r) => {
          this.user = r.data;
          return r;
        })
        .catch((e) => {
          return e;
        });
    },
    logoutAction() {
      axios
        .post(
          "/api/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((r) => {
          localStorage.setItem("token", "");
          this.$router.push("/");
          return r;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
 
<template>
  <div class="flex justify-center w-full">
    <div class="w-full">
      <nav class="bg-slate-950 p-4 w-100 rounded-b-md">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white text-lg font-semibold">
            <a href="/">My Todo list</a>
          </div>
          <div class="space-x-4">
            <router-link
              @click="logoutAction()"
              class="text-white bg-red-500 rounded-md p-2 hover:font-bold"
              >Disconect</router-link
            >
          </div>
        </div>
      </nav>
      <h2 class="text-center mt-12 text-2xl font-semibold text-gray-700">
        Welcome, {{ user?.name }}!
      </h2>
      <SectionTodolist/>
    </div>
  </div>
</template>