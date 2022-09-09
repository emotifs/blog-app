<template>
  <router-link :to="linkPost">
    <div class="blog-card text-left mt-5">
      <div class="flex" style="width: 100%">
        <div style="width: 60%">
          <p class="text-left text-sm font-bold my-3">Written by <span class="text-white p-2 rounded-2xl" style="background-color: rgb(164,122,211)">{{post.author}}</span></p>
          <div>
            <h1 class="text-2xl font-bold">{{postTitle}}</h1>
          </div>
          <div class="my-2">
            <p>{{postBody}}</p>
          </div>
         <div class="flex">
           <div class="mr-8">
             {{ new Date(post.created_at).toLocaleString("en-us", { dateStyle: "medium" }) }}
           </div>
           <div v-if="post.comments.length > 0">
             {{post.comments.length }} comments
           </div>
         </div>
        </div>
        <div style="width: 30%; min-height: 200px" >
          <img v-if="!errImage" :src="post.image" class="w-full" alt="">
          <img v-else src="../../assets/test_blog.png" class="w-full" alt="">
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "blogCard",
  props : ['post'],
  data (){
    return {
      link : this.post.image,
      errImage : false
    }
  },
  computed : {
    postBody(){
      return this.post.body.slice(0,50) + ' ...'
    },
    postTitle(){
      if( this.post.title.length > 50){
        return this.post.title.slice(0, 50) + '...'
      }
      return this.post.title.slice(0, 50)

    },
    linkPost(){
      return 'blogs/' + this.post.id
    }
  },
    mounted(){
      const response = axios.get(this.link)
          .catch(err => {
            // console.log(err.code)
            if(err.code === 'ERR_BAD_REQUEST'){
              this.errImage =true
            }
          })
      // console.log(response.code)
    }
}
</script>

<style scoped lang="scss">

</style>