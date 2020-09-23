<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>

      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      />

    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  components: {
    'task': require('components/Tasks/Task').default
  },
  computed: {
    ...mapGetters('tasks', ['tasks']),
  }
}
</script>

<style lang="scss" scoped>
</style>
