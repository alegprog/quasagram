<template>
  <q-banner class="bg-grey-3 q-mb-lg">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No Tasks to do today!
      <template v-slot:action>
        <q-btn
          @click="$emit('showAddTask')"
          flat
          color="primary"
          label="Add Task" />
      </template>
    </q-banner>
</template>
