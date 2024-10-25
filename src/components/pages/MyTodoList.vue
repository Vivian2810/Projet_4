<script>
import axios from "axios";
import SectionTodolist from "../SectionTodolist.vue";
import Navbar from "../Navbar.vue";

export default {
  name: "MyTodoList",
  components: {
    SectionTodolist,
    Navbar,
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
      <Navbar />
      <h2 class="text-center mt-12 text-2xl font-semibold">
        Welcome, {{ user?.name }}!
      </h2>
      <SectionTodolist />
    </div>
  </div>
</template>