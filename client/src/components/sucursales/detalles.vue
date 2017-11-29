<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media class="imgfilter" :src="require('../../assets/gasolina.jpg')" height="150px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ sucursal.nombreSuc }}</h3>
            <span>{{ encargado.usrName }} {{ encargado.lastname }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange"
            @click="navigateTo({
              name: 'sucursales'
            })"
          >Ver Todas</v-btn>
        </v-card-actions>
      </v-card>
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
      sucursal: '',
      encargado: '',
      idSuc: this.$store.state.route.params.idSuc
    }
  },
  async mounted () {
    const idSuc = this.$store.state.route.params.idSuc
    this.sucursal = (await SucursalesServices.show(idSuc)).data[0]
    this.encargado = (await UsuariosServices.show(this.sucursal.encargado)).data[0]
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.imgfilter {
  -webkit-filter: blur(2px);
  filter: blur(2px);
}
</style>
