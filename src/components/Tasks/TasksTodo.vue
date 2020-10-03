<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div class="q-mb-lg">
      <list-header bgColor="bg-orange-4">Tasks Todo</list-header>
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
export default {
  props: ['tasks'],
  components: {
    'task': require('components/Tasks/Task').default,
    'list-header': require('components/Shared/ListHeader').default,
  }
}
</script>
