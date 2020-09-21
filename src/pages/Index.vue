<template>
  <q-page padding>
    <ul>
      <task v-for="(task, index) in tasks" :task="task" :index="index" :key="index" />
    </ul>
  </q-page>
</template>

<script>
const tasks = [
  { name: 'Go to shop', dueDate: '2019-05-12', dueTime: '18:30'},
  { name: 'Get bananas', dueDate: '2019-05-13', dueTime: '02:00'},
  { name: 'Get apples', dueDate: '2019-05-14', dueTime: '16:00'},
];

export default {
  name: 'PageIndex',
  components: {
    'task': require('components/Task').default,
  },
  data() {
    return {
      tasks: tasks,
    }
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
