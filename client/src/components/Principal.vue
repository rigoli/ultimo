<template v-if="!$store.state.isUserLoggedIn">
  <v-layout column>
    <v-flex>
      <v-content>
        <section>
          <v-parallax :src="require('../assets/gasolina.jpg')" height="600">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
              <img :src="require('../assets/gb-logo.png')" alt="Vuetify.js" height="200">
              <h1 class="white--text mb-2 display-1 text-xs-center">Grupo Barajas</h1>
              <div class="subheading mb-3 text-xs-center">Servicio Cerca de ti</div>
              <v-btn
                class="blue lighten-2 mt-5"
                dark
                large
                @click="navigateTo({name: 'login'})">
                Entrar
              </v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-container grid-list-xl>
            <v-layout row wrap justify-center class="my-5">
              <v-flex xs12 sm4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Nosotros</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 offset-sm1>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contactenos</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  </v-card-text>
                  <v-list class="transparent">
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>777-867-5309</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">place</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Chicago, US</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">email</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>admin@gbarajas.com</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-content>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
