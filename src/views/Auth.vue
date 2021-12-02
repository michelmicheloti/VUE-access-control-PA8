<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div class="auth-img"></div>

      <div class="auth-input">
        <label for="lbl-username" class="text-white"
          ><strong>UserName</strong></label
        >
        <input
          class="form-control mb-2"
          type="text"
          v-model="user.userName"
          placeholder="UserName"
        />
        <label for="lbl-username" class="text-white"
          ><strong>Password</strong></label
        >
        <input
          @keyup.enter="signin"
          class="form-control mb-2"
          type="password"
          v-model="user.password"
          placeholder="Password"
        />
        <div class="card-group btn d-flex justify-content-center mt-2">
          <b-overlay
            :show="buttonLoad"
            rounded
            opacity="0.6"
            spinner-small
            spinner-variant="primary"
            class="d-inline-block"
          >
            <b-button @click="signin" variant="success">SIGN IN</b-button>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { axios } from "@/config/axios";

export default {
  name: "Auth",
  data: function () {
    return {
      user: {},
      buttonLoad: false,
    };
  },
  methods: {
    toogleTemplate() {
      this.$store.commit("toggleTemplate", false);
    },
    async signin() {
      this.buttonLoad = true;
      await this.$router.push({ path: "/dashboard" });
      this.$store.commit("setUser", true);
      this.$store.commit("toggleTemplate", true);
      const user = {user : true};
      localStorage.setItem("key", JSON.stringify(user));      
      this.buttonLoad = false;

      // axios
      //   .post("/Auth/login", this.user)
      //   .then((res) => {
      //     this.$store.commit("setUser", res.data);
      //     localStorage.setItem(laudoKey, JSON.stringify(res.data));

      //     if (res.data.role === "Admin" || res.data.role === "SuperAdmin") {
      //       this.$store.commit("setIsAdmin", true);
      //     } else {
      //       this.$store.commit("setIsAdmin", false);
      //     }
      //     this.$store.commit("setFullName", res.data.fullName);

      //     this.buttonLoad = false;

      //     this.$store.commit("toggleTemplate", true);
      //     this.$router.push({ path: "/" });
      //   })
      //   .catch(showError)
      //   .then(() => {
      //     this.buttonLoad = false;
      //   });
    },
  },
  created() {
    this.toogleTemplate();
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/access.jpg");
  background-size: cover;
}

.auth-modal {
  width: 40vw;
  height: 40vh;
  border-radius: 7px;
  background: #00000099;

  display: flex;
  flex-direction: column;
}

.auth-img {
  background: #0d209d;
  width: 100%;
  border-radius: 7px 7px 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-input {
  padding: 5% 15%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.auth-input input {
  width: 100%;
}
</style>
