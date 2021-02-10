import axios from 'axios';

let instance = axios.create({
  baseURL: "http://conduit.productionready.io",
  // baseURL: "http://realworld.api.fed.lagounews.com",
  timeout: 20000
});

// 使用nuxt.js 的插件机制 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      let { user } = store.state
      if(user && user.token) config.headers.Authorization = `Token ${user.token}`;
      return config;
    },
    error => {
      return Promise.error(error);
    }
  );
}

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response && response.status === 200) { //响应成功拦截
      // console.log(process.env.NODE_ENV === 'production');
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    if (error.response && error.response.status) {
      return Promise.reject(error.response);
    }else{
      return Promise.reject(error);
    }
  }
);

export function request(config){
  config.method = config.method.toLowerCase();
  if(config.method == 'get'){
    config.params = config.data;
  }
  return instance.request(config)
}