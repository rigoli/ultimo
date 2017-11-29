<template>
  <dash-board v-if="$store.state.isUserLoggedIn" />

  <page-principal v-else />
</template>

<script>
import PagePrincipal from '@/components/Principal.vue'
import DashBoard from '@/components/DashBoard.vue'

export default {
  components: {
    PagePrincipal,
    DashBoard
  }
}
</script>

<style scoped>

</style>
