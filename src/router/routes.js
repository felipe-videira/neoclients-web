import ClientList from '@/views/ClientList.vue';
import ClientForm from '@/views/ClientForm.vue';

export default [
  {
    path: '/',
    name: 'ClientList',
    component: ClientList,
  },
  {
    path: '/novo-cliente',
    name: 'NewClient',
    component: ClientForm,
  },
  {
    path: '/cliente/:id',
    name: 'EditClient',
    component: ClientForm,
  },
];
