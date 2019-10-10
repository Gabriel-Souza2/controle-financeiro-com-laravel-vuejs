<template>
  <q-layout view="hHh Lpr fFf" > <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder">
          MyFinances
        </q-toolbar-title>
        <q-btn class="hidden btn-menu" flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-btn flat dense round icon="exit_to_app" @click="logout"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawerLeft"
      flat
      :width="300"
      :breakpoint="750"
      content-class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">

          <q-item 
            clickable 
            active-class="menu-item-active"
            v-ripple
            :to="{name: menuItem.route}"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section class="menu-title text-weight-bolder">
              {{ menuItem.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />

        </q-list>
        <q-list>
          <q-item clickable v-ripple @click="logout" >
            <q-item-section avatar>
              <q-icon name="cancel" />
            </q-item-section>
            <q-item-section class="menu-title text-weight-bolder">
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view v-if="init" />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      init: false,
      drawerLeft: true,
      menuList: [
        {
          icon: 'home',
          label: 'Home',
          separator: false,
          route: 'home'
        },
        {
          icon: 'bar_chart',
          label: 'Analytics',
          separator: false,
          route: 'analytics'
        },
        {
          icon: 'delete',
          label: 'Trash',
          separator: false,
          route: 'trash'
        },
        {
          icon: 'settings',
          label: 'Settings',
          separator: false,
          route: 'settings'
        },
        {
          icon: 'help',
          label: 'Help',
          separator: false,
          route: 'help'
        },
      ]
    }
  },
  methods: {
    async logout(){
      await this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({name: 'login'})
      })
    }
  },
  async created()
  {
    this.$q.loading.show()
    await this.$store.dispatch('entries/list')
    await this.$store.dispatch('categories/list')
    this.$q.loading.hide()
    this.init = true
  },

  beforeDestroy()
  {
    this.$q.loading.hide()    
  }
}
</script>
<style lang="stylus" scoped>
  .menu-title
    font-size 20px
  
  .menu-item-active
    background-color rgba(54, 149, 230, 1)
    color #fff

  @media(max-width $breakpoint-sm)
    .btn-menu
      display block !important
      
    
</style>
