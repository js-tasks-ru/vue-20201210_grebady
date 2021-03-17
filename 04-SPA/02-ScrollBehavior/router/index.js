import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition;
  if (Array.isArray(to.matched) && Array.isArray(from.matched)) {
    if (
      to.matched.some((url) => url.meta && 'saveScrollPosition' in url.meta) &&
      from.matched.some((url) => url.meta && 'saveScrollPosition' in url.meta)
    )
      return false;
  } else if (
    to.meta &&
    from.meta &&
    'saveScrollPosition' in to.meta &&
    'saveScrollPosition' in from.meta
  )
    return false;

  if (to.hash) {
    return {
      selector: to.hash,
    };
  } else {
    return { x: 0, y: 0 };
  }
}

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/02-ScrollBehavior',

  scrollBehavior,

  routes: [
    {
      path: '/',
      name: 'index',
      // alias: 'meetups'
      // redirect: '/meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
