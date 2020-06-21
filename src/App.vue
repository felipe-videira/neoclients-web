<template>
   <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense class="mt-15">

        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-table</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/novo-cliente">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Novo Cliente</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Neoclients</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>

        <transition name="slide">
          <router-view></router-view>
        </transition>

        <v-snackbar
          v-model="snackbar"
          :color="snackColor"
          content-class="font-weight-medium"
        >
          {{ snackText }}
          <template v-slot:action="{ attrs }">
            <v-btn
              icon
              dark
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import eventBus from '@/services/eventBus';

export default {
  name: 'App',

  data: () => ({
    drawer: true,
    snackbar: false,
    snackText: '',
    snackColor: 'blue',
  }),

  created() {
    eventBus.$on('show-snack', this.showSnack);

    this.setDrawer();
  },

  destroyed() {
    eventBus.$off('show-snack', this.showSnack);
  },

  methods: {

    setDrawer() {
      const { xs, sm } = this.$vuetify.breakpoint;
      this.drawer = !xs && !sm;
    },

    showSnack({ text, color }) {
      if (!text) return;

      this.snackbar = true;
      this.snackText = text;
      if (color) this.snackColor = color;
    },
  },

};
</script>
