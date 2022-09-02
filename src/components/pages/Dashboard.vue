<template>
dashboard
  <button @click="logout">Logout</button>
</template>

<script>
import {useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  name: "Dashboard",
  setup(){
    const router = useRouter()
    const store = useStore()
    const logout = () => {
      store.commit('removeToken')
      router.push('/login')
    }

    return{
      logout
    }
  },


}
</script>

<style scoped>

</style>
