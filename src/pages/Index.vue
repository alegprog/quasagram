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
      v-autofocus
      :class="{'error': message.length > 22}"
      ref="messageInput"
    />
    <button type="button" @click="clearMessage">Clear</button>
    <div>{{ message.length }}</div>
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
    errorStyle() {
      if (this.message.length > 22) {
        return {
          'color': 'red',
          'background': 'pink',
        }
      }
    }
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
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  mounted() {
    console.log(this.$refs);
    this.$refs.messageInput.className = 'bg-green';
  },
}
</script>

<style lang="scss" scoped>
  input, button {
    font-size: 23px;
  }
  .border-gray {
    border: 1px solid gray;
  }
  .error {
    color: red;
    background: pink;
  }
</style>
