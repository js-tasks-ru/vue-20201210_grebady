import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/06-Query',
  duplicateNavigationPolicy: 'ignore',
  routes: [
    {
      path: '/',
      component: () => import('../views/PageWithQuery'),
    },
  ],
});
