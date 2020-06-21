import Home from '../views/Home.vue';
import ClientForm from '../views/ClientForm.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/novo-cliente',
    name: 'NewClient',
    component: ClientForm,
  },
  {
    path: '/client/:id',
    name: 'EditClient',
    component: ClientForm,
  },
];
