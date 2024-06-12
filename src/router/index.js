import { createRouter, createWebHistory } from 'vue-router';
import campRegistration from "../components/campRegistration.vue";
import campLogin from "../components/campLogin.vue";
import campType from "../components/campType.vue";
import campReserve from "../components/campReserve.vue";

const routes = [
  {
    path: '/',
    component: campRegistration,
    name: 'signup'
  },
  {
    path: '/login',
    component: campLogin,
    name: 'login'
  },
  {
    path: '/list',
    component: campType,
    name: 'camps'
  },
  {
    path: '/reservation',
    component: campReserve,
    name: 'reservation'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
