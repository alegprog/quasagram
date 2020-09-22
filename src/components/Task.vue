<template>
  <li>
    <div>{{ index }} - <slot></slot></div>
    <small>{{ task.dueDate }} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(task.id)">X</button>
  </li>
</template>
<script>
export default {
  name: 'Task',
  props: [
    'task', 'index'
  ],
  methods: {
    deleteTask(id) {
      this.$emit('delete-task', id);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
