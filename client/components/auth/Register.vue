<template>
  <div>
    <v-alert
      :value="!!error"
      color="pink lighten-1"
      transition="fade-transition"
      dismissible text dense
      class="mb-7 text-left">
      {{ error }}
    </v-alert>
    <validation-observer
      ref="form"
      @submit.prevent="$refs.form.handleSubmit(submit)"
      tag="form"
      novalidate>
      <validation-provider
        v-slot="{ errors }"
        name="first name"
        rules="required">
        <v-text-field
          v-model="user.firstName"
          :error-messages="errors"
          name="first name"
          label="First Name"
          outlined
          class="required mb-1" />
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="last name"
        rules="required">
        <v-text-field
          v-model="user.lastName"
          :error-messages="errors"
          name="last name"
          label="Last Name"
          outlined
          class="required mb-1" />
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required">
        <v-text-field
          v-model="user.email"
          :error-messages="errors"
          type="email"
          name="email"
          label="Email"
          outlined
          class="required mb-1" />
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="password"
        rules="required|alphanumerical|min:6">
        <v-text-field
          v-model="user.password"
          :error-messages="errors"
          type="password"
          label="Password"
          outlined />
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="password confirmation"
        :rules="{ required: true, is: user.password }">
        <v-text-field
          v-model="user.passwordConfirmation"
          :error-messages="errors"
          type="password"
          label="Confirm Password"
          outlined />
      </validation-provider>
      <div class="d-flex justify-end mt-1">
        <v-btn
          type="submit"
          color="primary"
          block dark rounded depressed>
          Sign up
        </v-btn>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import api from '@/api/auth';

const REGISTER_ERR_MESSAGE = 'Register failed.';

const initUserPayload = () => ({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirmation: ''
});

export default {
  name: 'user-register',
  data: () => ({ user: initUserPayload(), error: null }),
  methods: {
    submit() {
      return api.register(this.user)
        .then(() => this.$router.push('/login'))
        .catch(() => (this.error = REGISTER_ERR_MESSAGE));
    }
  }
};
</script>
