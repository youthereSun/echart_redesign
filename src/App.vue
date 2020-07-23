<template>
  <div id="app">
    <loading v-show="showLoading" />
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view>
  </div>
</template>
<script>
  import loading from "./components/loading";
  import {mapState} from "vuex";
  export default{
    components:{
      loading
    },
    computed: {
      ...mapState({
        showLoading: state => state.showLoading,
      })
    },
  }

</script>
