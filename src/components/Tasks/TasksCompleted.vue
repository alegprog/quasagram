<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div
      :class="{'q-mt-lg': !settings.showTasksInOneList}"
    >
      <list-header
        v-if="!settings.showTasksInOneList"
        bgColor="bg-green-4"
      >
        Tasks Completed
      </list-header>
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
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['tasks'],
  computed: {
    ...mapGetters('settings', ['settings']),
  },
  components: {
    'task': require('components/Tasks/Task').default,
    'list-header': require('components/Shared/ListHeader').default,
  }
}
</script>
