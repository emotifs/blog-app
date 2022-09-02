<template>
  <Navigation />
  <router-view/>
</template>

<script>
import axios from "axios";
import Navigation from "@/components/layout/Navigation";
  export default {
    components: {Navigation},
    async beforeCreate() {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/get-user', token, {
          headers : {
            'Authorization' : 'Bearer ' + token
          }
        })

        this.$store.commit('setToken', token)
        this.$store.state.username = response.data.username
        this.$store.state.email = response.data.email
        this.$store.state.id = response.data.id
        this.$store.state.first_name = response.data.first_name
        this.$store.state.last_name = response.data.last_name
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('first_name', response.data.first_name)
        localStorage.setItem('last_name', response.data.last_name)
        localStorage.setItem('id', response.data.id)
        console.log(this.$store.state)
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

.router-link-active{
  color : rgb(132,122,211)
}

</style>
