// 验证是否登录
export default function({ store, redirect }){
  // 已经登录不能进登录注册页
  if(store.state.user){
    return redirect('/')
  }
}