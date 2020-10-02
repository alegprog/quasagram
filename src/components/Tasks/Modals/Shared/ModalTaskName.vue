<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      autofocus
      v-select-all
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      label="Task name"
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          name="close"
          @click="$emit('update:name', '')"
          class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: ['name'],
  directives: {
    selectAll: {
      inserted(el) {
        let input = el.querySelector('.q-field__native');
        input.addEventListener('focus', () => {
          if (input.value.length) {
            input.select();
          }
        });
      }
    },
  },
}
</script>
