<template>
  <v-layout column>
    <v-flex xs12>
      <panel title="Tanques">
        <v-btn
          slot="action"
          @click="navigateTo({name: 'registrarTanque'})"
          class="green darken-2"
          medium absolute right middle fab>
          <v-icon>add</v-icon>
        </v-btn>

        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
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
            <td>{{ props.item.idSuc }}</td>
            <td class="text-xs-right ">{{ props.item.idCom }}</td>
            <td class="text-xs-right ">{{ props.item.litros }} Ltrs</td>
            <td class="text-xs-right ">{{ props.item.ultimaRecarga }}</td>
            <td class="text-xs-right">
              <v-btn
                @click.stop="details = true"
                small fab>
                <v-icon>description</v-icon>
              </v-btn>
              <v-btn
                @click="navigateTo({
                  name: 'editarTanque',
                  params: {
                    idSuc: props.item.idTan
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

      <v-dialog v-model="details" max-width="700px">

      </v-dialog>

    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import TanquesServices from '@/services/Tanques'

export default {
  components: {
    Panel
  },
  data () {
    return {
      search: '',
      details: false,
      pagination: {},
      headers: [
        { text: 'Sucursal', value: 'idSuc', align: 'left' },
        { text: 'Combustible', value: 'idCom' },
        { text: 'Litros', value: 'litros' },
        { text: 'Ultima Recarga', value: 'ultimaRecarga' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'right' }
      ],
      items: this.items
    }
  },
  async mounted () {
    this.items = (await TanquesServices.index()).data[0]
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
    async eliminar (idSuc) {
      try {
        await TanquesServices.delete(idSuc)
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
