<template>
  <q-card>
    <modal-header>Add Task</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" />
        <div class="row q-mb-sm">
          <q-input outlined label="Due Date" v-model="taskToSubmit.dueDate" class="col">
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueDate"
                name="close"
                @click="clearDueDate"
                class="cursor-pointer" />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div
          v-if="taskToSubmit.dueDate"
          class="row q-mb-sm"
        >
          <q-input
            outlined
            label="Due Time"
            v-model="taskToSubmit.dueTime"
            class="col">
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueTime"
                name="close"
                @click="taskToSubmit.dueTime = ''"
                class="cursor-pointer" />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" label="Save" color="primary" />
      </q-card-actions>
    </form>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  components: {
    'modal-header': require('components/Tasks/Modals/Shared/ModalHeader').default,
    'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName').default,
  },
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitForm() {
      this.$refs.name.validate();
      if (!this.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit('close');
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = '';
      this.taskToSubmit.dueTime = '';
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
