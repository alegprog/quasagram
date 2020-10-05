<template>
  <form>
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
        class="col"
        label="Email"
        stack-label
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        type="password"
        class="col"
        label="Password"
        stack-label
      />
    </div>

    <div class="row justify-end">

      <q-btn
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
}
</script>
