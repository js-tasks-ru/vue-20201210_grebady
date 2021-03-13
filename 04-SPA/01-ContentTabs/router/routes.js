export const routes = [
  {
    path: '/',
    component: () => import('../views/BasePage'),
    children: [
      {
        path: 'a',
        name: 'a',
        component: () => import('../views/PageA'),
      },
      {
        path: 'b',
        name: 'b',
        component: () => import('../views/PageB'),
      },
    ],
  },
];
