<template>
    <div class="blog-card-wrap ">
      <div class="blog-cards mx-auto" style="width: 90%">
        <Blog :post="post" v-for="(post, index) in posts" :key="index" />
      </div>
    </div>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from 'vue'
import Blog from "@/components/pages/Blog";
export default {
  name: "Blogs",
  components : {
    Blog
  },
  setup() {
    const posts = ref([])
    onMounted(async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/posts/', {
        headers: {
          'Authorization': 'Basic bXVoYW1tYWRqb246YWRtaW4='
        }
      })
      console.log(response.data)

      posts.value = response.data.results
    })
    return {
      posts
    }

  }
}
</script>

<style scoped>
</style>