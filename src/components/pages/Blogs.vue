<template>
  <div class="blog-card-wrap ">
    <div class="blog-cards mx-auto flex" style="width: 90%">
      <div style="width: 80%;">
        <Blog :post="post" v-for="(post, index) in filteredBlog" :key="index"/>
      </div>
      <div style="width: 20%">
        <form class="w-full mt-5">
          <label for="default-search"
                 class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input type="search" id="default-search" v-model="input"
                   class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="" required>
            <button type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from 'vue'
import Blog from "@/components/pages/Blog";

export default {
  name: "Blogs",
  components: {
    Blog
  },
  setup() {
    const posts = ref([])
    let input = ref("")
    onMounted(async () => {

      const response = await axios.get('http://127.0.0.1:8000/api/v1/posts/', {
        headers: {
          'Authorization': 'Basic bXVoYW1tYWRqb246YWRtaW4='
        }
      })
      console.log(response.data)
      let results = response.data.results
      results.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      posts.value = results


    })

    function filteredBlog() {
      return posts.value.filter((res) => {
        console.log(input)
        res.title.toLowerCase().includes(input.value.toLowerCase())
      })

    }

    return {
      posts,
      filteredBlog
    }

  }
}
</script>

<style scoped>
</style>