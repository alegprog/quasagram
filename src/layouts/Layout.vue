<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <q-btn
          @click="logoutUser"
          v-else
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
        />

      </q-toolbar>
    </q-header>

    <q-footer elevated>
       <q-tabs>
          <q-route-tab
            v-for="(link, index) in essentialLinks"
            :key="index"
            :to="link.link"
            :icon="link.icon"
            :label="link.title"
            exact
          />
        </q-tabs>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="(link, index) in essentialLinks"
          :key="index"
          v-bind="link"
        />
        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          class="text-grey-4 absolute-bottom"
          clickable
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Todo',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
];

export default {
  name: 'Layout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    quitApp() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really quit Awesome Todo?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (this.$q.platform.is.electron) {
          require('electron').ipcRenderer.send('quit-app');
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
