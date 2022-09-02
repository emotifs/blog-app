<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else>
    <div v-if="admin">
      <div class="mx-auto text-left mt-10" style="width: 60%">
        <form action="" class="relative" @submit.prevent="editBlog">
          <label for="title" class="font-bold">Title : </label>
          <textarea id="title" v-model="title" class="w-full mb-8 p-3" rows="2"
                    style="border: 1px solid rgb(164,122,211)"></textarea>
          <label for="body" class="font-bold pt-8">Body : </label>
          <textarea id="body" v-model="body" class="w-full p-3" rows="8"
                    style="border: 1px solid rgb(164,122,211)"></textarea>
          <button class="p-3 text-white rounded float-right" type="submit" style="background-color: rgb(164,122,211)">
            Add Blog
          </button>

          <label for="isImage">Do you want to change image ?</label>
          <input type="checkbox" id="isImage" v-model="isImage">
          <div v-if="isImage">
            <label for="image" class="font-bold">Image : </label>
            <input type="file" @change="onFileChange"/>
          </div>
        </form>
        <div class="cls"></div>
      </div>
    </div>
    <div v-else>
      <p class="text-2xl font-bold">
        This post isn't yours, you can't edit it
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toast from 'vue-toastification'
export default {
  props: ['id'],
  name: "BlogEdit",
  data() {
    return {
      post: [],
      isLoading: false,
      title: '',
      body: '',
      image: '',
      isImage : false
    }
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0]
    },
    async editBlog() {
      let response
      if(this.isImage){
        const res = await axios.patch(`http://127.0.0.1:8000/api/v1/posts/${this.id}`, {
              body: this.body,
              title: this.title,
              image: this.image
            },
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
              }
            })
        response = res

      } else{
        const res = await axios.patch(`http://127.0.0.1:8000/api/v1/posts/${this.id}`, {
              body: this.body,
              title: this.title,
            },
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
              }
            })
        response = res
      }

      if (response.status === 201) {
        this.body = ''
        this.title = ''
        this.image = ''
        this.$router.push('/blogs')
        toast.success('Your post was added!')
      }
      console.log(response)
    }
  },
  async mounted() {
    this.isLoading = true
    const response = await axios.get('http://127.0.0.1:8000/api/v1/posts/', {
      headers: {
        'Authorization': 'Basic bXVoYW1tYWRqb246YWRtaW4='
      }
    })

    let singlePost = response.data.results
    singlePost = singlePost.filter(res => res.id === parseInt(this.id))
    this.post = singlePost[0]
    this.isLoading = false

    this.title = this.post.title
    this.body = this.post.body
    this.image = this.post.image
  },

  computed: {
    admin() {
      return this.post.author === localStorage.getItem('username')
    }
  }
}
</script>

<style scoped>

</style>