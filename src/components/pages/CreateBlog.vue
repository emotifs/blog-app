<template>
  <div class="mx-auto text-left mt-10" style="width: 60%">
    <form action="" class="relative" @submit.prevent="addBlog">
      <label for="title" class="font-bold">Title : </label>
      <textarea id="title" v-model="title" class="w-full mb-8 p-3" rows="2" style="border: 1px solid rgb(164,122,211)"></textarea>
      <label for="body" class="font-bold pt-8">Body : </label>
      <textarea id="body" v-model="body" class="w-full p-3" rows="8" style="border: 1px solid rgb(164,122,211)"></textarea>
      <button class="p-3 text-white rounded float-right" type="submit" style="background-color: rgb(164,122,211)" >Add Blog</button>
      <label for="image" class="font-bold">Image : </label>
      <input type="file" @change="onFileChange" />
    </form>
    <div class="cls"></div>
  </div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router/dist/vue-router";
export default {
  name: "CreateBlog",
  setup(){
    const title = ref('')
    const body = ref('')
    const image = ref('')
    const toast = useToast()
    const router = useRouter()
    const onFileChange = (e) => {
      image.value = e.target.files[0]
      console.log(e.target.files[0])
    }

    const addBlog = async () => {
      const response = await axios.post('/posts/', {
        body : body.value,
        title : title.value,
        image : image.value
      },
      {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          'content-type' :  'multipart/form-data'
        }
      })

      if(response.status === 201){
        body.value = ''
        title.value = ''
        image.value = ''
        router.push('/blogs')
        toast.success('Your post was added!')
      }
      console.log(response)
    }

    return {
      title, body, addBlog,
      onFileChange
    }
  }
}
</script>

<style scoped>

</style>