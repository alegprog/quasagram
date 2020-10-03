<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">

      <div class="row q-mb-lg">
        <search />
        <sort />
      </div>

      <p
        v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
      >
        No search results!
      </p>

      <q-scroll-area class="q-scroll-area-tasks">

        <tasks-todo
          v-if="Object.keys(tasksTodo).length"
          :tasks="tasksTodo"
        />

        <no-tasks
          v-else-if="!Object.keys(tasksTodo).length && !search"
        />

        <tasks-completed
          v-if="Object.keys(tasksCompleted).length"
          :tasks="tasksCompleted"
          class="q-mb-xl"
        />

      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn
          @click="showAddTask = true"
          round
          color="primary"
          size="24px"
          icon="add"
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'PageIndex',
  data() {
    return {
      showAddTask: false,
    }
  },
  components: {
    'tasks-todo': require('components/Tasks/TasksTodo').default,
    'tasks-completed': require('components/Tasks/TasksCompleted').default,
    'no-tasks': require('components/Tasks/NoTasks').default,
    'add-task': require('components/Tasks/Modals/AddTask').default,
    'search': require('components/Tasks/Tools/Search').default,
    'sort': require('components/Tasks/Tools/Sort').default,
  },
  computed: {
    ...mapState('tasks', ['search']),
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
  },
  mounted() {
    this.$root.$on('showAddTask', () => this.showAddTask = true);
  }
}
</script>

<style lang="scss" scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
