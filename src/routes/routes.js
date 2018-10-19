import { Layout } from 'layouts';
import { HomeTemplate, ListTemplate, DefaultTemplate, PageNotFoundTemplate } from 'templates';

const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomeTemplate
      },
      {
        path: '/list',
        exact: true,
        component: ListTemplate
      },
      {
        path: '/list/:id',
        exact: true,
        component: DefaultTemplate
      },
      {
        component: PageNotFoundTemplate
      }
    ]
  }
];

export default routes;
