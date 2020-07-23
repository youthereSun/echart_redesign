<template>
    <div class="padding_10">
        <s_input title="code" :default_field="chartCode" :disabled="true" />
        <s_input @setValue="handleMainTitleChange" :title="mainTitle.title" :default_field="mainTitle.default_field" />
 <!--       <s_input  @setValue="handleMainTitleLinkChange" :title="mainTitleLink.title" :default_field="mainTitleLink.default_field" />-->
        <s_input  @setValue="handleSubTitleChange"  :title="subTitle.title" :default_field="subTitle.default_field" />
  <!--      <s_input  @setValue="handleSubTitleLinkChange"  :title="subTitleLink.title" :default_field="subTitleLink.default_field" />-->
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_input from "./original_components/s_input";
    export default {
        name: "titleSetting",
        components:{
            s_input
        },
        computed: {
            ...mapState({
                chartData:state=> state.chartList[state.currentChartId],
            })
        },
        data(){
            return{
                chartCode:"",
                    mainTitle:{
                        title:"主标题文本",
                        default_field:"主标题"
                    },
                mainTitleLink:{
                    title:"主标题文本超链接",
                    default_field:"http://"
                },
                subTitle:{
                    title:"副标题文本",
                    default_field:"副标题"
                },
                subTitleLink:{
                    title:"副标题文本超链接",
                    default_field:"http://"
                },
            }
        },
        created() {
            this.initData();
        },
        methods:{
            initData(){
                this.chartCode=this.chartData.otherSetting.code;
                this.mainTitle.default_field=this.chartData.title.text;
                this.subTitle.default_field=this.chartData.title.subtext;

            },
            mergeProps(propName,val){
                let copyObject=this.chartData;
                Vue.set(copyObject.title, propName,  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleMainTitleChange(val){
               this.mergeProps("text",val)
            },
            handleMainTitleLinkChange(val){
                this.mergeProps("link",val)
            },
            handleSubTitleChange(val){
                this.mergeProps("subtext",val)
            },
            handleSubTitleLinkChange(val){
                this.mergeProps("sublink",val)
            }
        }

    }
</script>

<style scoped>

</style>