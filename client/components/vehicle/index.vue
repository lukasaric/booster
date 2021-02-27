<template>
  <v-container fluid class="pa-8">
    <v-row class="toolbar">
      <v-col lg="4" md="6">
        <vehicle-select
          v-model="filter"
          :params="{ limit: 5 }"
          append-icon="mdi-magnify"
          single-line hide-details clearable
          class="mb-1" />
        <v-checkbox
          v-model="showArchived"
          label="Show archived"
          hide-details
          class="my-2 archived-checkbox" />
      </v-col>
      <v-col lg="8" md="6" class="d-flex justify-end">
        <v-btn @click="showDialog = true" text>
          <v-icon dense class="mr-1">mdi-plus</v-icon>Create Vehicle
        </v-btn>
        <create-dialog
          @created="fetch(defaultPage)"
          :visible.sync="showDialog" />
      </v-col>
    </v-row>
    <div v-if="isLoading" class="d-flex justify-center mt-12">
      <v-progress-circular size="50" indeterminate />
    </div>
    <v-data-iterator
      v-else
      :items="vehicles"
      :options.sync="options"
      :footer-props="{ itemsPerPageOptions: [30, 60, 90, -1] }"
      :server-items-length="totalItems"
      :hide-default-footer="totalItems < options.itemsPerPage">
      <template slot-scope="{ items }">
        <v-row>
          <v-col v-for="item in items" :key="item.id" lg="3" md="4" sm="6">
            <v-card
              color="blue-grey darken-3"
              min-height="200"
              dark
              class="d-flex flex-column justify-space-between">
              <v-card-title class="text-h5 grey--text text--lighten-3">
                {{ item.make }}
              </v-card-title>
              <v-card-text>
                <p>
                  <b>Model:</b>
                  {{ item.model }}
                </p>
                <p>
                  <b>Year:</b>
                  {{ item.year }}
                </p>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="removeOrRestore(item)" color="secondary" text>
                  <v-icon class="mr-1">mdi-{{ getLabel(item) }}</v-icon>
                  {{ getLabel(item) }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import api from '@/api/vehicle';
import CreateDialog from './CreateDialog';
import throttle from 'lodash/throttle';
import VehicleSelect from '@/components/common/VehicleSelect';

const defaultPage = ({ sortBy = 'make' } = {}) => ({
  sortBy: [sortBy], sortDesc: [false], page: 1
});

export default {
  name: 'vehicle-list',
  data: () => ({
    vehicles: [],
    filter: null,
    totalItems: 0,
    showArchived: false,
    showDialog: false,
    isLoading: true,
    options: { itemsPerPage: 30, ...defaultPage() }
  }),
  computed: { defaultPage },
  methods: {
    fetch: throttle(async function (opts) {
      Object.assign(this.options, opts);
      const params = { filter: this.filter, archived: this.showArchived };
      const { items, total } = await api.fetch({ ...this.options, params });
      this.vehicles = items;
      this.totalItems = total;
    }, 400),
    removeOrRestore(vehicle) {
      const { deletedAt } = vehicle;
      const action = deletedAt ? 'create' : 'remove';
      return api[action](vehicle)
        .then(() => this.fetch(defaultPage))
        .finally(() => (this.showArchived = false));
    },
    getLabel: ({ deletedAt }) => deletedAt ? 'restore' : 'delete'
  },
  watch: {
    options: 'fetch',
    filter: 'fetch',
    showArchived() {
      this.fetch(defaultPage({ sortBy: 'deletedAt' }));
    }
  },
  async created() {
    await this.fetch(this.defaultPage);
    this.isLoading = false;
  },
  components: { CreateDialog, VehicleSelect }
};
</script>

<style lang="scss" scoped>
::v-deep .archived-checkbox {
  &.v-input--checkbox {
    justify-content: flex-end;
  }

  .v-input__slot {
    flex-direction: row-reverse;

    .v-input--selection-controls__input {
      justify-content: center;
      margin-right: 0;
    }

    .v-icon {
      font-size: 1.125rem;
    }

    label {
      font-size: 0.875rem;
    }
  }
}
</style>
