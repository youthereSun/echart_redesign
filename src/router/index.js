import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "../views/configs";
import store from "../store";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '主页',
    component: home,
    meta: {
      title: '主页',
      keepAlive: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
     meta: {
       title: '关于我的',
           keepAlive: false
     }
  },
    {
      path: '/edit',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      meta: {
        title: '图表编辑',
        keepAlive: false
      }
    },
    {path:'*',
      component:home,
      meta: {
        title: '主页',
        keepAlive: false
      }},//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
]

const router = new VueRouter({
  routes
})

//路由跳转之前处理
router.beforeEach((to, from, next) => {
  //console.log(to.matched),返回匹配到的路由
  store.commit("toggleShowLoading",false)
  //页面跳转更改页面标题

/*
  if (to.matched.length ===0) {  //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();    //如果匹配到正确跳转
  }*/
  next();
  document.title = to.meta.title;
});

export default router
