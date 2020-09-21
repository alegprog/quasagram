<template>
  <q-page padding>
    <input type="text" v-model="message" @keyup="handleKeyup" />
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
    handleKeyup(e) {
      if (e.keyCode === 27) { // Esc key
        this.clearMessage();
      } else if(e.keyCode === 13) { // Enter key
        this.alertMessage();
      }
    },
    alertMessage() {
      alert(this.message);
    }
  }
}
</script>
