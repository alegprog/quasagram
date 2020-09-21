<template>
  <q-page padding>
    <button
      type="button"
      style="position: absolute; right: 10px;"
      @click="++counter"
    >
      {{ counter }}
    </button>

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
    <hr>
    <p>Uppercase message: {{ messageUppercase }}</p>
    <p>Lowercase message: {{ message | messageLowercase }}</p>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      message: 'I love Vuejs!',
      counter: 0,
    }
  },
  computed: {
    messageUppercase() {
      return this.message.toUpperCase();
    },
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    alertMessage() {
      alert(this.message);
    },
  },
  filters: {
    messageLowercase(value) {
      return value.toLowerCase();
    }
  },
}
</script>

<style lang="scss">
  .border-gray {
    border: 1px solid gray;
  }
</style>
