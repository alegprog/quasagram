<template>
  <q-page class="q-pa-md">

    <tasks :tasks="tasksTodo" />

    <hr>

    <tasks :tasks="tasksCompleted" />

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
    'add-task': require('components/Tasks/Modals/AddTask').default,
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
  }
}
</script>

<style lang="scss" scoped>
</style>
