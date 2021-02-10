// 验证是否登录
export default function({ store, redirect }){
  // 未登录重定向去登录
  if(!store.state.user){
    return redirect('/Login/Login')
  }
}