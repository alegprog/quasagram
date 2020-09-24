<template>
  <q-page class="q-pa-md">

    <tasks
      v-if="Object.keys(tasksTodo).length"
      title="Todo"
      :tasks="tasksTodo"
      bgColor="bg-orange-4" />

    <no-tasks v-else />

    <tasks
      v-if="Object.keys(tasksCompleted).length"
      title="Completed"
      :tasks="tasksCompleted"
      bgColor="bg-green-4" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  data() {
    return {
      showAddTask: false,
    }
  },
  components: {
    'tasks': require('components/Tasks/Tasks').default,
    'no-tasks': require('components/Tasks/NoTasks').default,
    'add-task': require('components/Tasks/Modals/AddTask').default,
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
  },
  mounted() {
    this.$root.$on('showAddTask', () => this.showAddTask = true);
  }
}
</script>

<style lang="scss" scoped>
</style>
