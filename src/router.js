module.exports = (resolve) => {
  return [
    {
      name: 'Home',
      path: '/',
      component: resolve(__dirname, './pages/Home.vue')
    },
    {
      name: 'Login',
      path: '/Login/Login',
      component: resolve(__dirname, './pages/Login/Register.vue'),
    },
    {
      name: 'Register',
      path: '/Login/Register',
      component: resolve(__dirname, './pages/Login/Register.vue'),
    },
    {
      name: 'Profile',
      path: '/Profile/:name',
      component: resolve(__dirname, './pages/Profile.vue')
    },
    {
      name: 'Settings',
      path: '/Settings',
      component: resolve(__dirname, './pages/Settings.vue')
    },
    {
      name: 'Edit_Article',
      path: '/Create/Edit_Article',
      component: resolve(__dirname, './pages/Create/Edit_Article.vue')
    },
    {
      name: 'Article',
      path: '/Article/:slug',
      component: resolve(__dirname, './pages/Article.vue')
    }
  ]
}