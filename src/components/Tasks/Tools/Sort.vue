<template>
  <q-select
    filled
    class="col q-ml-sm"
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    stack-label
  />
</template>
<script>
export default {
  data () {
    return {
      sortBy: null,
      options: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Date',
          value: 'dueDate'
        },
      ],
    }
  }
}
</script>
<style lang="scss" scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
