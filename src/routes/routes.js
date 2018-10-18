import { Layout } from 'layouts';
import { DefaultTemplate, PageNotFoundTemplate } from 'templates';

const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
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
