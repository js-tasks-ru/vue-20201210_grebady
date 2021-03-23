import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/04-Layouts',
  routes: [
    {
      path: '/',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage'),
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormPage'),
    },
  ],
});
