<template>
  <div class="q-mb-lg">
    <list-header :bgColor="bgColor">{{ title }}</list-header>
    <q-list
      separator
      bordered>

      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      />

    </q-list>
  </div>
</template>
<script>
export default {
  props: ['tasks', 'title', 'bgColor'],
  components: {
    'task': require('components/Tasks/Task').default,
    'list-header': require('components/Shared/ListHeader').default,
  }
}
</script>
