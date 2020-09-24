<template>
  <q-card-section class="row justify-between">
    <div class="text-h6"><slot /></div>
    <q-btn
      flat round
      v-close-popup
      color="dark"
      icon="close"
    />
  </q-card-section>
</template>

<script>
export default {

}
</script>
