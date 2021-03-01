<template>
  <v-autocomplete
    @change="$emit('input', $event)"
    v-bind="$attrs"
    :value="value"
    :items="items"
    :search-input.sync="search"
    :no-data-text="noDataLabel"
    placeholder="Search"
    return-object no-filter>
    <template #selection="{ item: { make, model, year } }">
      {{ make }} ({{ model }} - {{ year }})
    </template>
    <template #item="{ item: { make, model, year } }">
      {{ make }} ({{ model }} - {{ year }})
    </template>
  </v-autocomplete>
</template>

<script>
import api from '@/api/vehicle';
import throttle from 'lodash/throttle';

export default {
  name: 'user-group-select',
  props: {
    value: { type: Object, default: null },
    params: { type: Object, default: () => ({}) }
  },
  data: () => ({ vehicles: [], search: null }),
  computed: {
    items: vm => vm.value ? vm.vehicles.concat([vm.value]) : vm.vehicles,
    noDataLabel() {
      const { search, vehicles } = this;
      return !search && !vehicles.length
        ? 'Start typing to search...'
        : 'No matches found...';
    }
  },
  methods: {
    fetch: throttle(async function () {
      const params = { ...this.params, search: this.search };
      this.vehicles = (await api.fetch({ params })).items;
    }, 400)
  },
  watch: {
    search(filter) {
      if (filter) this.fetch();
    },
    value() {
      this.vehicles = [];
    }
  }
};
</script>
