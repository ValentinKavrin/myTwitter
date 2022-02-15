<template>
  <q-layout view="hHh Lpr fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="note_alt" color="white"  size="32px" />
          MyTwitter
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" v-if="currentRouteName !== '/' && currentRouteName !== '/auth'">
        <q-route-tab to="/feeds" label="Feeds" />
        <q-route-tab to="/profile" label="Profile" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <p class="text-caption">@White11010, ValentinKavrin, 2022</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.path;
    }
  }
}
</script>
