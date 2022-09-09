<template>
  <div class="mx-auto mt-8 text-left" style="width: 60%;" v-for="post in post">
    <h1 class="text-3xl font-bold" >
      {{post.title}} <p v-if="admin"> <router-link  :id="post.id" :to='editLink'>Edit</router-link></p>
    </h1>
    <p class="text-sm my-3">Posted on : {{new Date(post.created_at).toLocaleString("en-us", { dateStyle: "medium" })}}</p>
    <img :src="post.image" class="w-full" alt="">
    <div class="my-5">
      <p>
        {{post.body}}
      </p>
    </div>
    <div>
      <div class="flex relative ">
        <p class="font-bold text-2xl mb-5">Like : {{post.likes}}</p>
        <p class="p-3 text-white rounded absolute right-40 cursor-pointer" @click="unlike" v-if="liked"> <i class="fa-solid fa-heart fa-2x" style="color: red"></i></p>
        <p class="p-3 text-white rounded absolute right-40 cursor-pointer" @click="like" v-if="!liked"> <i class="fa-regular fa-heart fa-2x" style="color: red"></i></p>
        <button class="p-3 text-white rounded absolute right-0" v-if="this.$route.path.toString()[this.$route.path.toString().length -1]  !== 't'" style="background-color: rgb(164,122,211)" @click="this.$router.push(this.$route.path + '/add-comment')">Add Comment</button>
      </div>
      <router-view :id="post.id"></router-view>
      <div v-for="comment in comments">
        <div class="flex my-4">
          <div class="flex-shrink-0 mr-3 previewImg">
            {{ comment.user.slice(0, 2).toUpperCase()   }}
          </div>
          <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>{{ comment.user }}</strong>
            <p class="text-sm">
              {{comment.body}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "BlogPreview",
  props : ['id'],
  data(){
    return{
      post :[],
      comments : [],
      liked : false
    }
  },

  methods : {
    async like() {
      const response = await axios.post('/post-like/', {
        post : this.id,
        action : 'like'
      }, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      })

      if(response.status === 200){
        this.liked = true
      }
      console.log(response)
    },
    async unlike() {
      const response = await axios.post('/post-like/', {
        post : this.id,
        action : 'unlike'
      }, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      })

      if(response.status === 200){
        this.liked = false
      }
      console.log(response)
    }
  },
  async mounted() {
    const response = await axios.get('/posts/', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    })

    console.log(response.data.results)
    let singlePost = response.data.results
    singlePost = singlePost.filter(res => res.id === parseInt(this.id))
    this.post = singlePost
    console.log(singlePost[0])
    console.log(singlePost[0].is_liked)

    const response1 = await axios.get(`/comments/?post=${this.id}`, {
      headers: {
        'Authorization' : "Basic bXVoYW1tYWRqb246YWRtaW4="
      }
    })

    this.comments = response1.data.results
  },

  computed : {
    admin(){
      return localStorage.getItem('username') === this.post[0].author
    },
    editLink(){
      return '/blogs/' + this.post[0].id + '/edit'
    }
  }
}
</script>

<style scoped>
  .previewImg{
    position: initial;
    width: 40px;
    height: 40px;
    background-color: #303030;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
</style>