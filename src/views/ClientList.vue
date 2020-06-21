<template>
  <span>
    <v-data-table
      class="elevation-1 mt-15"
      :headers="headers"
      :items="items"
      :loading="loading"
      :loading-text="loadingText"
      :no-data-text="noDataText"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
          class="mb-5 pt-5"
        >
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              v-show="!fabBtn"
              @click="createItem"
              color="primary"
              class="mb-2 mr-5"
              dark
            >
              Novo Cliente
            </v-btn>
          </v-row>
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
    <v-btn
      fab
      dark
      bottom
      right
      fixed
      class="mb-15"
      color="primary"
      @click="createItem"
      v-show="fabBtn"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </span>
</template>

<script>
import request from '@/services/request';
import eventBus from '@/services/eventBus';

export default {
  name: 'ClientList',

  data: () => ({
    fabBtn: false,
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
    loadingText: 'Carregando...',
    items: [],
  }),

  created() {
    this.getItems();
    this.setButton();
  },

  methods: {

    setButton() {
      const { xs, sm } = this.$vuetify.breakpoint;
      this.fabBtn = xs || sm;
    },

    async getItems() {
      try {
        this.loading = true;
        this.items = await request('/client', 'GET');
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
      eventBus.$emit('show-snack', {
        text: 'Ocorreu um erro, por favor tente novamente mais tarde.',
        color: 'red',
      });
    },
  },

};
</script>
