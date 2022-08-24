<template>
  <div class="body">
    <div class="container">
      <div class="screen">
        <base-dialog title="No user found" :show="!!err" @close="handleError">Username or password invalid, try again!</base-dialog>
        <base-dialog fixed :show="isLoading" title="Authicating...">
          <base-spinner></base-spinner>
        </base-dialog>
        <div class="screen__content">
          <form class="login" @submit.prevent="submitForm">
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input type="text" v-model.trim="data.username" class="login__input" placeholder="Username">
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input type="password" v-model.trim="data.password" class="login__input" placeholder="Password">
            </div>
            <div>
              <base-dialog title="Something went wrong" :show="!formIsValid" @close="handleError1">Username can't be empty or password must contain at least 8 chars</base-dialog>
            </div>
            <div class="" style="color : #7B77B8">
              <router-link to="/register">Not registered yet?</router-link>
            </div>
            <button class="button login__submit" type="submit">
              <span class="button__text">Log In Now</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";
import BaseDialog from "@/components/ui/BaseDialog";

export default {
  name: "TheLogin",
  components: {BaseDialog},

  setup() {
    const store = useStore();
    const formIsValid = ref(true)
    const err = ref(null)
    const isLoading = ref(false)
    const router = useRouter()
    const data = reactive({
      username: '',
      password: ''
    })

    const handleError = () => {
      err.value = null
    }

    const handleError1 = () => {
      formIsValid.value = true
    }

    const goDash = () => {
      router.push('/dashboard')
    }

    const submitForm = async () => {
      if(data.username === '' || data.password.length < 6){
        formIsValid.value = false
        return
      }

      isLoading.value = true

      try{
        await store.dispatch('login', {
          username : data.username,
          password : data.password
        })
        goDash();

      } catch (e){
        err.value = e.message
      }

      isLoading.value = false
    }

    return {
      data,
      formIsValid,
      submitForm,
      handleError,
      err,
      isLoading,
      handleError1
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');


.body {
  width: 100%;
  height: 100vh;
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
  overflow: hidden;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 460px;
  box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6A679E;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6A679E;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}
</style>
