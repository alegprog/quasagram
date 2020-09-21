<template>
  <q-page padding>
    <input
      type="text"
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage"
    />
    <button type="button" @click="clearMessage">Clear</button>
    <h5
      v-if="message.length"
      class="border-gray"
    >
      {{ message }}
    </h5>
    <h6 v-else>No message entered &#x1F61C;!</h6>
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

<style lang="scss">
  .border-gray {
    border: 1px solid gray;
  }
</style>
