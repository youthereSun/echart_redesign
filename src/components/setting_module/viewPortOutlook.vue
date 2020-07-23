<template>
    <div class="padding_10">
        <p class="setting_group_name">直角坐标系绘图区域外观（仅直角坐标系有效）</p>
        <s_radio @setValue="handleGridShowChange" :title="showGrid.title" :default_option="showGrid.default_option" :options="showGrid.options"/>
        <s_colorPicker
                @setValue="handleGridBackgroundColorChange"
                :title="bgColor.title"
                :default_color="bgColor.defaultColor"
        />
        <s_slider
                @setValue="handleGridBorderWidth2Change"
                :title="borderWidth.title"
                :max="borderWidth.max"
                :default_value="borderWidth.default"
                :unit="borderWidth.unit"
        />
        <s_colorPicker
                @setValue="handleGridBorderColorChange"
                :title="borderColor.title"
                :default_color="borderColor.defaultColor"
        />


    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "./original_components/s_slider";
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";
    export default {
        name: "viewPortOutlook",
        data(){
            return{
                showGrid:{
                    title: "背景设置",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"开启"},
                        { id:2,value:false,name:"关闭"},
                    ]
                },
                bgColor:{
                    title: "绘图区背景颜色",
                    defaultColor:"#FFFFFF"
                },
                borderColor:{
                    title: "绘图区边框颜色",
                    defaultColor:"#FFFFFF"
                },
                 borderWidth:{
                     title: "绘图区边框宽度",
                     max:10,
                     default:0,
                     unit:"px"
                 }

            }
        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        components:{
            s_colorPicker,
            s_slider,
            s_radio
        },
        created() {
            this.showGrid.default_option=this.chartData.grid.show;
            this.bgColor.defaultColor=this.chartData.grid.backgroundColor;
            this.borderColor.defaultColor=this.chartData.grid.borderColor;
            this.borderWidth.default=this.chartData.grid.borderWidth;
        },
        methods:{
            mergeProps(propName, val) {
                let copyObject = this.chartData;
                if(copyObject.grid==undefined){
                    Vue.set(copyObject, "grid", {});
                    Vue.set(copyObject.grid, propName, val.new_value);
                }else {
                    Vue.set(copyObject.grid, propName, val.new_value);
                }

                this.$store.commit("setChartData", copyObject)
            },
          /* 此配置项生效的前提是，设置了 grid.show: true
            Vue.set(copyObject.grid, "show", true);*/
            handleGridShowChange(val){
                this.mergeProps("show",val);
            },
            handleGridBackgroundColorChange(val) {
                this.mergeProps("backgroundColor",val);
            },
            handleGridBorderWidth2Change(val) {
                this.mergeProps("borderWidth",val);
            },
            handleGridBorderColorChange(val) {
                this.mergeProps("borderColor",val);
            },
        }

    }
</script>

<style scoped>

</style>