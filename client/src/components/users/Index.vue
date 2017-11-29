<template>
  <v-layout column>
    <v-flex xs12>
      <panel title="Usuarios">
        <v-btn
          slot="action"
          @click="navigateTo({name: 'RegistrarUsuario'})"
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
            <td>{{ props.item.usrName, props.item.lastname }}</td>
            <td class="text-xs-right ">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.idSuc }}</td>
            <td class="text-xs-right">{{ props.item.privilege }}</td>
            <td class="text-xs-right">
              <v-btn
                @click.stop="details = true"
                small fab>
                <v-icon>description</v-icon>
              </v-btn>
              <v-btn
                @click="navigateTo({
                  name: 'editar-usuario',
                  params: {
                      usuario: props.item.id
                  }
                  })"
                small fab>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                @click="navigateTo({
                    name: 'eliminar-usuario',
                    params: {
                      usuario: props.item.id
                    }})"
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
        <v-card>
          <v-card-media :src="require('../../assets/display_test.jpg')" height="300px">
            <v-layout column class="media">
              <v-card-title>
                <v-btn dark icon>
                  <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">Ali Conners</div>
              </v-card-title>
            </v-layout>
          </v-card-media>
          <v-list two-line>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>1400 Main Street</v-list-tile-title>
                <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-card-actions>
            <v-btn color="primary" @click.stop="details=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
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
      headers: [
        {
          text: 'Nombre',
          value: 'lastname',
          align: 'left'
        },
        { text: 'Correo', value: 'email' },
        { text: 'Sucursal', value: 'sucursal' },
        { text: 'privilege', value: 'Privilegios' },
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
    this.items = (await UsuariosService.index()).data[0]
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
</style>
