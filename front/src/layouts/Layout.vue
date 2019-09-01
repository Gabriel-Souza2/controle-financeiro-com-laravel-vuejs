<template>
  <q-layout view="hHh Lpr fFf" > <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          MyFinances
        </q-toolbar-title>
        <q-btn flat dense round icon="exit_to_app" @click="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      flat
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item :to="{name: 'home'}">
            <q-item-section avatar>
              <q-icon name="home"></q-icon>
            </q-item-section>
            <q-item-section>Home</q-item-section>
        </q-item>
        
        <q-item>
          <q-item-section avatat>
            <q-icon name=""></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  },
  methods: {
    async logout(){
      await this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>
