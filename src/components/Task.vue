<template>
  <li>
    <div>{{ index }} - <slot></slot></div>
    <small>{{ task.dueDate }} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(index)">X</button>
  </li>
</template>
<script>
export default {
  name: 'Task',
  props: [
    'task', 'index'
  ],
}
</script>
<style lang="scss" scoped>
</style>
