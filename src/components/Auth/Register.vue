<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to access your Todos anywhere!
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email addess.']"
        ref="email"
        lazy-rules
        class="col"
        label="Email"
        stack-label
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
        ref="password"
        lazy-rules
        type="password"
        class="col"
        label="Password"
        stack-label
      />
    </div>

    <div class="row justify-end">

      <q-btn
        type="submit"
        color="primary"
        label="Register"
      />

    </div>

  </form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if( !this.refs.email.hasError && !this.$refs.password.hasError) {
        console.log('Register User!');
      }
    },
  },
}
</script>
