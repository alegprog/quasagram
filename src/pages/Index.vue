<template>
  <q-page padding>
    <ul>
      <task v-for="task in tasks" :task="task" :key="task.id" v-on:delete-task="deleteTask">
        {{ task.name }}
      </task>
    </ul>
  </q-page>
</template>

<script>
const tasks = [
  { id: 1, name: 'Go to shop', dueDate: '2019-05-12', dueTime: '18:30'},
  { id: 2, name: 'Get bananas', dueDate: '2019-05-13', dueTime: '02:00'},
  { id: 3, name: 'Get apples', dueDate: '2019-05-14', dueTime: '16:00'},
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
    deleteTask(event) {
      this.tasks = [...this.tasks.filter(task => task.id !== event)];
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
