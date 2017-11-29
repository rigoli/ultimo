<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <Panel title="Editar Tanque">
        <form
          name="puxBitacora-userReg"
          autocomplete="off">
          <v-flex xs6>
            <v-select
              v-bind:items="sucursales"
              v-model="sucursal"
              label="Sucursal"
              item-value="idSuc"
              item-text="nombreSuc"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <br>
          <v-flex xs6>
            <v-select
              v-bind:items="combustibles"
              v-model="combustible"
              label="Combustible"
              item-value="idCom"
              item-text="nombre"
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
          Guardar
        </v-btn>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SucursalesServices from '@/services/Sucursales'
import CombustiblesServices from '@/services/Combustibles'

import TanquesServices from '@/services/Tanques'

export default {
  data () {
    return {
      nombre: '',
      encargado: [],
      sucursales: [],
      combustibles: [],
      error: null
    }
  },
  async mounted () {
    this.tanque = (await TanquesServices.index()).data[0]
    this.sucursales = (await SucursalesServices.index()).data[0]
    this.combustibles = (await CombustiblesServices.index()).data[0]
  },
  methods: {
    async guardar () {
      try {
        await TanquesServices.post({
          idSuc: this.sucursal,
          idCom: this.combustible
        })
        this.$router.push({
          name: 'tanques'
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
