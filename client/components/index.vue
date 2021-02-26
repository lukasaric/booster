<template>
  <div>
    <navbar />
    <v-container fill-height class="d-flex justify-center align-start">
      <v-progress-circular v-if="isLoading" size="50" indeterminate />
      <router-view v-else />
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar';

export default {
  name: 'home',
  data: () => ({ isLoading: true }),
  created() {
    // fetch vehicles
    this.isLoading = false;
  },
  components: { Navbar }
};
</script>
