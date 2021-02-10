const router = require('./src/router');
module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    title:'RealWorld'
  },
  srcDir: 'src',
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清空源数组列表
      routes.splice(0);
      routes.push(...router(resolve));
    }
  },

  server:{
    host: '0.0.0.0',
    port: 3389
  },
  // 插件注册
  plugins:[
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}