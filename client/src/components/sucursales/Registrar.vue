<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <Panel title="Registrar Sucursal">
          <form
            name="puxBitacora-userReg"
            autocomplete="off">
            <v-text-field
              label="Nombre"
              v-model="nombre"
            ></v-text-field>
            <br>
            <v-flex xs6>
              <v-select
                v-bind:items="items"
                v-model="encargado"
                label="Encargado"
                item-value="id"
                item-text="usrName"
                return-object
                :hint="`${encargado.usrName}, ${encargado.lastname}`"
                persistent-hint
                single-line
                bottom
              ></v-select>
            </v-flex>
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
import SucursalesServices from '@/services/Sucursales'
import UsuariosServices from '@/services/Usuarios'

export default {
  data () {
    return {
      nombre: '',
      encargado: [],
      items: this.items,
      error: null
    }
  },
  async mounted () {
    this.items = (await UsuariosServices.index()).data[0]
  },
  methods: {
    async registrar () {
      try {
        const response = await SucursalesServices.post({
          nombreSuc: this.nombre,
          encargado: this.encargado
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'sucursales'
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
