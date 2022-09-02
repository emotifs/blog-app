<template>
    <div class="wrapper bg-white">
      <div class="form-header">
        Edit Profile
      </div>
      <form action="" @submit.prevent="submitData">
        <div class="form-grp">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="data.username">
        </div>

        <div class="form-grp">
          <label for="email">Email</label>
          <input type="text" v-model="data.email" id="email">
        </div>

        <div class="form-grp">
          <label for="fname">Firstname</label>
          <input type="text" v-model="data.first_name" id="fname">
        </div>

        <div class="form-grp">
          <label for="sname">Secondname</label>
          <input type="text" v-model="data.last_name" id="snames">
        </div>
        <div class="form-grp">
          <base-button type="submit">Update profile</base-button>
        </div>
      </form>


    </div>
</template>

<script>
import {reactive} from 'vue'
import {useStore} from "vuex";
import axios from "axios";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router/dist/vue-router";
export default {
  name: "ProfileEdit",
  setup(){
    const data = reactive({
      username : localStorage.getItem('username'),
      email : localStorage.getItem('email'),
      id : localStorage.getItem('id'),
      first_name : localStorage.getItem('first_name'),
      last_name : localStorage.getItem('last_name')
    })
    const store = useStore()
    const toast = useToast()
    const router = useRouter()

    const submitData = async() => {
      const response = await axios.put('http://127.0.0.1:8000/api/v1/user-update', data, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      })

      if(response.status === 200){
        toast.success('Profile updated!', { timeout: 2000 })
        router.push('/dashboard')
      }
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('first_name', response.data.first_name)
      localStorage.setItem('last_name', response.data.last_name)
      localStorage.setItem('id', response.data.id)
      console.log(response)
    }

    return {
      data, submitData
    }
  }
}
</script>

<style scoped lang="scss">

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800);
@import url(https://fonts.googleapis.com/css?family=Droid+Sans:400,700);
@import "//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";

$dark: #212121;
$input-border-radius: 4px;
$input-border-width: .063rem;
$input-border-color: #b0bec5;
$input-padding: .75rem .875rem;
$input-submit-bg: #2196f3;
$input-submit-bg-hover: lighten($input-submit-bg, 5%);
$input-submit-padding: .75rem 1.5rem;
$body-bg: #fff;

*, *:before, *:after {
  box-sizing: border-box;
}


.wrapper {
  max-width: 500px;
  height: 420px;
  margin: 3rem auto;
  background: $body-bg;
  padding: 0 0 1rem;
  position: relative;
}

.form-header {
  background: #fff;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: $dark;
  padding: 1rem;
  margin: 0 0 1rem;
  position: relative;

.close {
  position: absolute;
  right: 1rem;
  top: 1.25rem;
  color: darken($body-bg, 10%);
  cursor: pointer;
  transition: color .2s ease;

&:hover {
   color: $dark;
 }
}
}

.form-grp {
  margin: 0 2rem 1rem;

label {
  display: block;
  margin: 0 0 .5rem;
  font-weight: 700;
  letter-spacing: .2px;
  font-size: .875rem;
  color: $dark;

&.inline {
   display: inline-block;
   width: 100px;
 }

&.inline.right {
   text-align: right;
   padding-right: .5rem;
 }
}
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: $input-padding;
  border-radius: $input-border-radius;
  outline: 0;
  color: $dark;
  font-size: .875rem;
  width: 100%;
  border: $input-border-width solid $input-border-color;

}

input[type="submit"] {
  padding: $input-submit-padding;
  margin: .5rem 0 0;
  outline: 0;
  border: 0;
  background: $input-submit-bg;
  border-radius: $input-border-radius;
  color: #FFF;
  font-weight: 700;
  font-size: .875rem;
  letter-spacing: .25px;
  transition: background .3s ease;

&:hover {
   background: $input-submit-bg-hover;
 }
}
</style>
