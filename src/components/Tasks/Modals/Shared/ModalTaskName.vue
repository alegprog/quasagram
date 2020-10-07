<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      v-autofocus
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
import { selectAll } from 'src/directives/directive-select-all';
import { autofocus } from 'src/directives/directive-autofocus';

export default {
  props: ['name'],
  directives: {
    selectAll,
    autofocus,
  },
}
</script>
