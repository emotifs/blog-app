<template>
  <form action="" class="relative" @submit.prevent="addComment">
    <textarea v-model="body" class="w-full p-3" rows="5" style="border: 1px solid rgb(164,122,211)"></textarea>
    <button class="p-3 text-white rounded float-right mb-5" type="submit" style="background-color: rgb(164,122,211)" >Add Comment</button>
  </form>
  <div class="cls"></div>
</template>

<script>
import axios from "axios";

export default {
  props : ['id'],
  name: "AddComment",
  data(){
    return {
      body : ''
    }
  },
  methods : {
    addComment(){
      const response = axios.post('http://127.0.0.1:8000/api/v1/comments/', {
        is_active : true,
        body : this.body,
        "post" : this.id
      }, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response)
    }
  }
}
</script>

<style scoped>
  .cls{
    clear: both;
  }
</style>