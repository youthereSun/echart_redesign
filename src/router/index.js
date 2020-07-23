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
      path: '/home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      meta: {
        title: '图表编辑',
        keepAlive: false
      }
    }
]

const router = new VueRouter({
  routes
})

//路由跳转之前处理
router.beforeEach((to, from, next) => {
  next();
  store.commit("toggleShowLoading",false)
  //页面跳转更改页面标题
  document.title = to.meta.title;
});

export default router
