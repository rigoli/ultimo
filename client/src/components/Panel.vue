<template>
  <v-layout column>
    <v-flex xs12>
      <div class="white elevation-2">
        <v-toolbar flat dense class="light-green darken-1" dark>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <slot name="action" />
        </v-toolbar>

        <div class="pl-4 pr-4 pt-4 pb-2">
          <slot>
              No slot content defined.
          </slot>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>

</style>
