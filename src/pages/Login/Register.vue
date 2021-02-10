<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign {{isLogin?'in':'up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/Login/Login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/Login/Register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(item, k) in errors">
              <li v-for="(items, index) in item" :key="index">
                {{k}} {{items}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="login">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="user.password" type="password" minlength="8" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right"> Sign {{isLogin?'in':'up'}} </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
// 只在客户端执行
const Cookie = process.client ? require('js-cookie') : undefined;
// let Api = {};
// process.client && (Api = require('@/api/index.js').default);
import Api from '@/api/index.js';

export default {
  name:'Login',
  middleware: 'unauthenticated',
  data(){
    return{
      user:{
        "username": "",
        "email": "umbal@qq.com",
        "password": "12345678"
      },
      errors: {} //错误信息
    }
  },
  computed:{
    isLogin() {
      return this.$route.name === 'Login'
    }
  },
  created() {
  },
  methods:{
    login(){
      if(this.isLogin){
        Api.login({
          user: this.user
        }).then(res => {
          this.loginAfter(res);
        }, err => {
          this.errors = err.data.errors;
        });
      }else{
        Api.Registr({
          user: this.user
        }).then(res => {
          this.loginAfter(res);
        }, err => {
          this.errors = err.data.errors;
        })
      }
    },
    loginAfter(res){
      // 存store
      this.$store.commit('setUser', res.user);
      // 存cookie
      Cookie.set('user', res.user);
      this.$router.push('/')
    }
  }
}
</script>

