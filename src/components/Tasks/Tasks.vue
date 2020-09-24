<template>
  <q-list
    v-if="Object.keys(tasks).length"
    separator
    bordered>

    <task
      v-for="(task, key) in tasks"
      :key="key"
      :task="task"
      :id="key"
    />

  </q-list>
</template>
<script>
export default {
  props: ['tasks'],
  components: {
    'task': require('components/Tasks/Task').default,
  }
}
</script>
