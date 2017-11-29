<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <Panel title="Editar Sucursal">
          <form
            name="puxBitacora-sucEdit"
            autocomplete="off">
            <v-text-field
              label="Nombre"
              required
              v-model="sucursal.nombreSuc"
            ></v-text-field>
            <br>
            <v-flex xs6>
              <v-select
                v-bind:items="items"
                v-model="select"
                required
                label="Encargado"
                item-value="idUsr"
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
            @click="guardar">
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
  async mounted () {
    const idSuc = this.$store.state.route.params.idSuc
    this.sucursal = (await SucursalesServices.show(idSuc)).data[0]
    this.items = (await UsuariosServices.index()).data[0]
    this.encargado = (await UsuariosServices.show(this.sucursal.encargado)).data[0]
  },
  data () {
    return {
      sucursal: '',
      nombre: '',
      encargado: '',
      select: { idUsr: 4 },
      items: '',
      error: null
    }
  },
  methods: {
    async guardar () {
      this.error = null
      const idSuc = this.$store.state.route.params.idSuc

      try {
        await SucursalesServices.put({
          idSuc: idSuc,
          nombreSuc: this.sucursal.nombreSuc,
          encargado: this.select.idUsr
        })
        this.$router.push({
          name: 'sucursales',
          params: {
            idSuc: idSuc
          }
        })
      } catch (err) {
        console.log(err)
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
