import Ajax from '@/util/index.js';

const list = [
  [`/api/users/login`, 'POST', 'login'], //登录接口
  [`/api/users`, 'POST', 'registr'], //注册
  // 首页接口
  [`/api/articles`, 'GET', 'globalArticles'], //全局文章
  [`/api/articles/feed`, 'GET', 'feedArticles'], //你关注人的文章
  [`/api/tags`, 'GET', null], //标签列表 
  [`/api/articles`, 'POST', 'favorite'], //添加点赞
  [`/api/articles`, 'DELETE', 'unfavorite'], //删除点赞
  // 文章页面
  [`/api/articles`, 'GET', 'getArticles'], //获取文章
  [`/api/articles`, 'POST ', 'createArticles'], //创建文章
  [`/api/articles/:slug/comments`, 'GET', 'getComments'], //获取文章评论
  [`/api/articles/:slug/comments`, 'POST', 'addComments'], //创建文章评论
];

export default Ajax(list);