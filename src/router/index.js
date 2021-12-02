import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/card",
    name: "Card",
    component: () => import("../views/Card.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router