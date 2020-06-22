<template>
  <v-form
    ref="form"
    v-model="valid"
    class="mt-15"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="values.firstName"
            :rules="rules.firstName"
            :label="labels.firstName"
            :disabled="loading || loadingDelete"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="values.lastName"
            :rules="rules.lastName"
            :label="labels.lastName"
            :disabled="loading || loadingDelete"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-mask="'###.###.###-##'"
            v-model="values.cpf"
            :rules="rules.cpf"
            :label="labels.cpf"
            :disabled="loading || loadingDelete"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="values.email"
            :rules="rules.email"
            :label="labels.email"
            :disabled="loading || loadingDelete"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-mask="'(##) #####-####'"
            v-model="values.cellphone"
            :rules="rules.cellphone"
            :label="labels.cellphone"
            :disabled="loading || loadingDelete"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-mask="'(##) ####-####'"
            v-model="values.telephone"
            :rules="rules.telephone"
            :label="labels.telephone"
            :disabled="loading || loadingDelete"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-15">
        <v-col cols="12" md="2">
          <v-btn
            color="success"
            @click="submit"
            :loading="loading"
            :disabled="!valid || loadingDelete"
            block
          >
            Salvar
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            :class="resetButtonClass"
            color="warning"
            @click="reset"
            :disabled="loadingDelete"
            block
          >
            Limpar
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            :class="cancelButtonClass"
            @click="cancel"
            :disabled="loadingDelete"
            block
          >
            Cancelar
          </v-btn>
        </v-col>
      </v-row>
      <v-btn
        v-show="editing"
        color="error"
        :loading="loadingDelete"
        @click="deleteItem"
        absolute
        top
        right
      >
        Excluir
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import {
  validateCpf,
  validateEmail,
  stripNonNumeric,
} from '@/utils';
import eventBus from '@/services/eventBus';
import request from '@/services/request';

export default {
  name: 'ClientForm',

  data: () => ({
    valid: false,
    loading: false,
    loadingDelete: false,
    editing: false,
    values: {
      firstName: '',
      lastName: '',
      email: '',
      cpf: '',
      cellphone: '',
      telephone: '',
    },
    labels: {
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'E-mail',
      cpf: 'CPF',
      cellphone: 'Celular',
      telephone: 'Telefone',
    },
    rules: {
      firstName: [(v) => !!v || 'O nome do cliente é obrigatório'],
      lastName: [(v) => !!v || 'O sobrenome do cliente é obrigatório'],
      email: [
        (v) => !!v || 'O e-mail do cliente é obrigatório',
        (v) => validateEmail(v) || 'e-mail inválido',
      ],
      cpf: [
        (v) => !!v || 'O CPF do cliente é obrigatório',
        (v) => validateCpf(stripNonNumeric(v)) || 'CPF inválido',
      ],
      cellphone: [
        (v) => !!v || 'O celular do cliente é obrigatório',
        (v) => (!!v && stripNonNumeric(v).length === 11) || 'Celular inválido',
      ],
      telephone: [
        (v) => !v || stripNonNumeric(v).length === 10 || 'Telefone inválido',
      ],
    },
  }),

  created() {
    this.getValues();

    this.editing = !!this.$route.params.id;
  },

  computed: {
    resetButtonClass() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'mt-10';
        default:
          return 'ml-10';
      }
    },
    cancelButtonClass() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return '';
        default:
          return 'ml-10';
      }
    },
  },

  methods: {

    async getValues() {
      try {
        this.loading = true;

        const { id } = this.$route.params;
        if (!id) return;

        this.values = await request(`/client/${id}`);
      } catch (error) {
        this.showError();
      } finally {
        this.loading = false;
      }
    },

    async submit() {
      try {
        this.loading = true;

        if (!this.$refs.form.validate()) return;

        const { id } = this.$route.params;

        const body = {
          ...this.values,
          cpf: stripNonNumeric(this.values.cpf),
          cellphone: stripNonNumeric(this.values.cellphone),
          telephone: stripNonNumeric(this.values.telephone),
        };

        const { message } = await request(
          `/client/${id || ''}`,
          id ? 'PATCH' : 'POST',
          body,
        );

        this.showSuccess(message);

        this.$router.push({ name: 'ClientList' });
      } catch (error) {
        this.showError();
      } finally {
        this.loading = false;
      }
    },

    async deleteItem() {
      try {
        this.loadingDelete = true;

        const { id } = this.$route.params;
        if (!id) return;

        const { message } = await request(`/client/${id}`, 'DELETE');

        this.showSuccess(message);

        this.$router.push({ name: 'ClientList' });
      } catch (error) {
        this.showError();
      } finally {
        this.loadingDelete = false;
      }
    },

    reset() {
      this.$refs.form.reset();
    },

    cancel() {
      this.$router.push({ name: 'ClientList' });
    },

    showError() {
      eventBus.$emit('show-snack', {
        text: 'Ocorreu um erro, por favor tente novamente mais tarde.',
        color: 'red',
      });
    },

    showSuccess(text) {
      eventBus.$emit('show-snack', {
        text,
        color: 'green',
      });
    },
  },
};
</script>
