<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="values.firstName"
            :rules="rules.firstName"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {
  validateCpf,
  validateEmail,
} from '@/utils';

export default {
  data: () => ({
    valid: false,
    values: {
      firstName: '',
      lastName: '',
      email: '',
      cpf: '',
      cellphone: '',
      telephone: '',
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
        (v) => validateCpf(v) || 'CPF inválido',
      ],
      cellphone: [
        (v) => !!v || 'O celular do cliente é obrigatório',
        (v) => v.length === 11 || 'Celular inválido',
      ],
      telephone: [(v) => v.length === 10 || 'Telefone inválido'],
    },
  }),
};
</script>
