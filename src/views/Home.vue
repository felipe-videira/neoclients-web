<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import request from '@/services/request';

export default {
  data: () => ({
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'CPF', value: 'cpf' },
      { text: 'Celular', value: 'cellphone' },
      { text: 'E-mail', value: 'email' },
      { text: '', value: 'actions', sortable: false },
    ],
    items: [],
  }),

  created() {
    this.getItems();
  },

  methods: {

    async getItems() {
      this.items = await request('/client');
    },

    editItem({ id }) {
      this.$router.push({
        name: 'EditClient',
        params: { id },
      });
    },
  },
};
</script>
