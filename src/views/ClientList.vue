<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    class="elevation-1 mt-15"
    :no-data-text="noDataText"
  >
   <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-btn
          @click="createItem"
          color="primary"
          class="mb-2"
          dark
        >
          Novo Cliente
        </v-btn>
      </v-toolbar>
    </template>
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
import eventBus from '@/services/eventBus';

export default {
  name: 'ClientList',

  data: () => ({
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'firstName',
      },
      { text: 'CPF', value: 'cpf' },
      { text: 'Celular', value: 'cellphone' },
      { text: 'E-mail', value: 'email' },
      { text: '', value: 'actions', sortable: false },
    ],
    noDataText: 'Você não possui clientes.',
    items: [],
  }),

  created() {
    this.getItems();
  },

  methods: {

    async getItems() {
      try {
        this.loading = true;
        this.items = await request('/client');
      } catch (err) {
        this.showError();
      } finally {
        this.loading = false;
      }
    },

    createItem() {
      this.$router.push({
        name: 'NewClient',
      });
    },

    editItem({ id }) {
      this.$router.push({
        name: 'EditClient',
        params: { id },
      });
    },

    showError() {
      eventBus.$emit('show-alert', {
        message: 'Ocorreu um erro, por favor tente novamente mais tarde.',
        color: 'red',
        icon: 'mdi-error',
      });
    },
  },

};
</script>
