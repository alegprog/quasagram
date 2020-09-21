<template>
  <q-page padding>
    <input
      type="text"
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage"
      @mouseenter="alertMessage"
    />
    <button type="button" @click="clearMessage">Clear</button>
    <h5>{{ message }}</h5>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      message: 'I love Vuejs!',
    }
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    alertMessage() {
      alert(this.message);
    }
  }
}
</script>
