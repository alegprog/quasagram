<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered>
      <q-toolbar class="constrain">
        <q-btn
          flat round dense
          to="/camera"
          class="large-screen-only q-mr-sm"
          icon="eva-camera-outline"
          size="1.1rem"
          />
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title class="text-grand-hotel text-bold">
          Quasagram
        </q-toolbar-title>
        <q-btn
          flat round dense
          to="/"
          class="large-screen-only"
          icon="eva-home-outline"
          size="1.1rem"
          />

      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer
      class="bg-white small-screen-only"
      bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent">
        <q-route-tab
          to="/"
          name="home"
          icon="eva-home-outline"
          />
        <q-route-tab
          to="/camera"
          name="camera"
          icon="eva-camera-outline"
          />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.q-toolbar {
  @media(min-width: $breakpoint-sm-min) {
    height: 5rem;
  }
}
.q-toolbar__title {
  font-size: 2rem;

  @media(max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
.q-footer {
  .q-tab__icon {
    font-size: 2rem;
  }
}
</style>
