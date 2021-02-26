<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar';

export default {
  name: 'home',
  components: { Navbar }
};
</script>
