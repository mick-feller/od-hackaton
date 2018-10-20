import { Layout } from 'layouts';
import { SignInTemplate, HomeTemplate, ListTemplate, DefaultTemplate, PageNotFoundTemplate, ScheduleTemplate } from 'templates';

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
        path: '/signin',
        exact: true,
        component: SignInTemplate
      },
      {
        path: '/list',
        exact: true,
        component: ListTemplate
      },
      {
        path: '/schedule',
        exact: true,
        component: ScheduleTemplate
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
