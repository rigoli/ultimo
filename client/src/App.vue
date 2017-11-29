<template>
  <v-app id="gbarajas">
    <!-- <page-menu />

    <page-header /> -->
    <v-navigation-drawer
      v-if="$store.state.isUserLoggedIn"
      fixed overflow
      v-model="primaryDrawer.model"
      :mini-variant="primaryDrawer.mini"
      enable-resize-watcher
      app>
      <v-toolbar flat class="transparent green darken-1">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>face</v-icon>
              <!-- <img :src="require('./assets/User-profile.png')" alt="profile"> -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ $store.state.user.usrName }} {{ $store.state.user.lastname }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="menu in menus" :key="menu.title"
          @click="navigateTo({name: `${menu.goto}` })">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app fixed :clipped-left="primaryDrawer.clipped">
      <v-toolbar-side-icon
        v-if="$store.state.isUserLoggedIn"
        @click.stop="primaryDrawer.mini = !primaryDrawer.mini">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <span
          class="home"
          @click="navigateTo({name: 'home'})">
          Grupo Barajas
        </span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          flat dark
          @click="navigateTo({name: 'nuevo-reporte'})">
          <v-icon>insert_drive_file</v-icon> Nuevo Reporte
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          flat dark
          @click="navigateTo({name: 'login'})">
          <v-icon>vpn_key</v-icon>  Entrar
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          flat dark
          @click="logout">
          <v-icon>exit_to_app</v-icon> Salir
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <main>
          <v-layout align-center justify-center>
            <v-flex xs12>
              <router-view />
            </v-flex>
          </v-layout>
        </main>
      </v-container>
    </v-content>
    <v-footer :fixed="true" app>
      <span>Grupo Barajas &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    dark: false,
    drawer: true,
    onLogin: [],
    primaryDrawer: {
      model: true,
      type: 'persistent',
      mini: false
    },
    menus: [
      { title: 'DashBoard', icon: 'dashboard', goto: 'dashboard' },
      { title: 'Sucursales', icon: 'business', goto: 'sucursales' },
      { title: 'Tanques', icon: 'play_for_work', goto: 'tanques' },
      { title: 'Pagos', icon: 'beenhere', goto: 'pagos' },
      { title: 'Usuarios', icon: 'supervisor_account', goto: 'usuarios' },
      { title: 'Reportes', icon: 'assignment_ind', goto: 'reportes' }
    ]
  }),
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    test (msg) {
      alert(msg)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
