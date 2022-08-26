<template>
dashboard
  <button @click="this.$store.dispatch('logout'); ">Logout</button>
</template>

<script>
export default {
  name: "Dashboard",

  setup(){
  }
}
</script>

<style scoped>

</style>
