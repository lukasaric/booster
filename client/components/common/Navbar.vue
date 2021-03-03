<template>
  <v-app-bar color="primary" app dark>
    <v-toolbar-title>
      <router-link :to="{ name: 'vehicles' }" class="d-flex align-center">
        <v-icon size="24" color="secondary" class="mr-2">mdi-car-outline</v-icon>
        <span class="app-title white--text">Booster</span>
        <v-divider vertical class="mx-2" />
        <span class="subtitle mt-1">Vehicle System Management</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div v-on="on" class="dropdown-activator">
          <v-icon size="24" class="mr-1">mdi-account-circle</v-icon>
          <template v-if="!$vuetify.breakpoint.mobile">
            <span>{{ user.email }}</span>
            <v-icon size="24" class="mr-1">mdi-chevron-down</v-icon>
          </template>
        </div>
      </template>
      <v-list>
        <v-list-item @click.prevent="logout">
          <v-list-item-title>
            <v-icon size="24" class="mr-1">mdi-logout</v-icon>
            <span>Logout</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'main-navbar',
  computed: mapState('auth', ['user']),
  methods: mapActions('auth', ['logout'])
};
</script>

<style lang="scss" scoped>
.subtitle {
  color: #fff;
  font-size: 0.875rem;
}

.dropdown-activator {
  cursor: pointer;
}

@media screen and (max-width: 56.25rem) {
  .v-toolbar__title {
    .app-title {
      font-size: 1.125rem;
    }

    .subtitle {
      font-size: 0.75rem;
    }
  }
}
</style>
