<template>
  <q-item
    @click="updateTask({ id, updates: { completed: !task.completed } })"
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough' : task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      />
    </q-item-section>

    <q-item-section
      v-if="task.dueDate"
      side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            name="event"
            size="18px"
            class="q-mr-xs"
          />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat round dense
          color="warning"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(id)"
          flat round dense
          color="negative"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task
        :task="task"
        :id="id"
        @close="showEditTask = false" />
    </q-dialog>

  </q-item>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import { date } from 'quasar';
  const { formatDate } = date;

  export default {
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask').default,
    },
    props: ['task', 'id'],
    data() {
      return {
        showEditTask: false,
      }
    },
    computed: {
      ...mapState('tasks', ['search']),
    },
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteTask(id);
        });
      },
      showEditTaskModal() {
        this.showEditTask = true;
      }
    },
    filters: {
      niceDate(value) {
        return formatDate(value, 'MMM D');
      },
      searchHighlight(value, search) {
        if (search) {
          let searchRegExp = new RegExp(search, 'ig')
          return value.replace(searchRegExp, match => {
            return `<span class="bg-yellow-6">${match}</span>`;
          });
        }
        return value;
      },
    },
  }
</script>
<style lang="scss" scoped>
</style>
