import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/03-NotFound',
  routes: [
    {
      path: '/page-a',
      component: () => import('../views/PageA'),
    },
    {
      path: '/page-b',
      component: () => import('../views/PageB'),
    },
    {
      path: '*',
      component: () => import('../views/NotFoundPage'),
    },
  ],
});
