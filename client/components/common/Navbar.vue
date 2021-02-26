<template>
  <v-app-bar color="primary" app dark>
    <v-toolbar-title>
      <router-link :to="{ name: 'vehicles' }" class="d-flex align-center">
        <v-icon size="24" class="mr-1">mdi-car-outline</v-icon>
        <span class="white--text">Booster</span>
        <v-divider vertical class="mx-2" />
        <span class="subtitle mt-1">Vehicle System Management</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div v-on="on" class="dropdown-activator">
          <v-icon size="24" class="mr-1">mdi-account-circle</v-icon>
          <span>{{ user.email }}</span>
          <v-icon size="24" class="mr-1">mdi-chevron-down</v-icon>
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
  font-size: 0.875rem;
  color: #fff;
}
.dropdown-activator {
  cursor: pointer;
}
</style>
