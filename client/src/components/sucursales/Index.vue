<template>
  <v-layout column>
    <v-flex xs12>
      <panel title="Sucursales">
        <v-btn
          slot="action"
          @click="navigateTo({name: 'RegistrarSucursal'})"
          class="green darken-2"
          medium absolute right middle fab>
          <v-icon>add</v-icon>
        </v-btn>

        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:usuario="usuario"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          hide-actions
          light
          class="elevation-4"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.nombreSuc }}</td>
            <td class="text-xs-right ">{{ getUsuario(props.item.encargado) }}</td>
            <td class="text-xs-right">
              <v-btn
                @click="navigateTo({
                  name: 'detallesSucursal',
                  params: {
                    idSuc: props.item.idSuc
                  }
                })"
                small fab>
                <v-icon>description</v-icon>
              </v-btn>
              <v-btn
                @click="navigateTo({
                  name: 'editarSucursal',
                  params: {
                    idSuc: props.item.idSuc
                  }
                })"
                small fab>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                class="red lighten-3"
                @click="eliminar(props.item.idSuc)"
                small fab>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SucursalService from '@/services/Sucursales'
import UsuariosService from '@/services/Usuarios'

export default {
  components: {
    Panel
  },
  data () {
    return {
      search: '',
      details: false,
      pagination: {},
      selected: [],
      usuario: [],
      headers: [
        {
          text: 'Nombre',
          value: 'nombreSuc',
          align: 'left'
        },
        { text: 'Encargado', value: 'encargado' },
        { text: 'Acciones',
          value: 'actions',
          sortable: false,
          align: 'right'
        }
      ],
      items: this.items
    }
  },
  async mounted () {
    this.items = (await SucursalService.index()).data[0]
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async getUsuario (idUser) {
      this.usuario = (UsuariosService.show(idUser)).data[0]
      console.log(this.usuario.lastname)
    },
    async eliminar (idSuc) {
      try {
        await SucursalService.delete(idSuc)
        // this.items.$remove(this.item)
        this.$router.push({
          name: 'sucursales'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
