<template>
  <div id="main" :class="{ 'hide-template': !isTemplateVisible }">
    <Header v-show="isTemplateVisible" />
    <Content />
    <Footer v-show="isTemplateVisible" />
  </div>
</template>

<script>
// import axios from "./config/axios";
import { mapState } from "vuex";
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";

export default ({
  name: "App",
  components: { Header, Content, Footer },
  computed: mapState(["isTemplateVisible", "user"]),
  data: function () {
    return {
    };
  },
  methods: {
    validaLogin() {
      const json = localStorage.getItem("key");
      const storageData = JSON.parse(json);
      this.$store.commit("setUser", storageData);
      this.$store.commit("toggleTemplate", true);

      if (!storageData) {
        this.$store.commit("toggleTemplate", false);
        this.$router.push({ name: "Auth" });
        return;
      }
    }
  },
  created() {
    this.validaLogin();
  }
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main {
  height: 100vh;
  display: grid;
  grid-template-rows: 64px 1fr 60px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
}

#main.hide-template {
  grid-template-areas:
    "content"
    "content"
    "content";
}

.table {
  color: white !important;
}

</style>
