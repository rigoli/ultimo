<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <Panel title="Registrar Usuario">
          <form
            name="puxBitacora-userReg"
            autocomplete="off">
            <v-text-field
              label="Nombre"
              v-model="nombre"
            ></v-text-field>
            <br>
            <v-text-field
              label="Apellidos"
              v-model="apellidos"
            ></v-text-field>
            <br>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Contraseña"
              type="password"
              v-model="password"
              autocomplete="new-password"
              ></v-text-field>
            <br>
            <v-text-field
              label="Sucursal"
              v-model="sucursal"
            ></v-text-field>
            <br>
            <br>
            <v-text-field
              label="Privilegios"
              v-model="privilegios"
            ></v-text-field>
            <br>
          </form>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn
            dark
            class="green darken-1"
            @click="registrar">
            Registrar
          </v-btn>
       </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      sucursal: '',
      privilegios: '',
      error: null
    }
  },
  methods: {
    async registrar () {
      try {
        const response = await AuthenticationService.registrar({
          nombre: this.nombre,
          apellidos: this.apellidos,
          email: this.email,
          usrPassword: this.password,
          sucursal: this.sucursal,
          privilegios: this.privilegios
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: black;
}
</style>
