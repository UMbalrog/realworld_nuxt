<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="/">conduit</a> -->
        <nuxt-link class="navbar-brand" exact to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link class="nav-link" exact to="/">Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/Create/Edit_Article"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/Settings"><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
            </li>
            <li class="nav-item">   
              <nuxt-link class="nav-link" to="/Profile/123">
                <img class="user-pic" :src="user.image">{{user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/Login/Login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/Login/Register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt/>
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
  
</template>
<script>
import { mapState } from 'vuex';

export default {
  name:'default',
  computed:{
    ...mapState(['user'])
  }
}
</script>

