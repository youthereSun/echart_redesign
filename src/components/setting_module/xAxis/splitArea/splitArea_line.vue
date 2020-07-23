<template>
    <div class="padding_10">
        <s_radio @setValue="handleSplitAreaShowChange" :title="showArea.title" :default_option="showArea.default_option" :options="showArea.options"/>
        <p class="setting_group_name">区域特定样式设置
        </p>
    <!--    <s_checkbox  @setValue="handleSplitAreaShowChange" :title="fillArea.title"  :default_value="fillArea.default_value"/>-->
        <s_color-picker @setValue="handleSplitAreaStyleColorChange" :title="fillAreaColor.title" :default_color="fillAreaColor.defaultColor"  />

    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "../../original_components/s_slider";
    import s_radio from "../../original_components/s_radio";
    import s_colorPicker from "../../original_components/s_colorPicker";
    import s_checkbox from "../../original_components/s_checkbox";

    export default {
        name: "splitArea_line",
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        props:{
            axis: {
                type: String,
                required: false,
                default:"xAxis"
            },
            id: {
                type: Number,
                required: false,
                default: 0
            }
        },
        data() {
            return {
                showArea: {
                    title: "网格区域是否显示",
                    default_option: false,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"},
                    ]
                },
                fillAreaColor: {
                    title: "区域颜色",
                    defaultColor: "#f0000"
                },
                fillArea: {
                    title: "是否填充区域颜色",
                    default_value:false

                },
            }
        },
        components: {
            s_radio,
            s_colorPicker,
            s_slider,
            s_checkbox

        },
        created() {
        this.initData();
            },
        methods:{
            initData(){
                this.showArea.default_option=this.chartData[this.axis][this.id].splitArea.show;
                this.fillAreaColor.defaultColor=this.chartData[this.axis][this.id].splitArea.areaStyle.color;
            //  this.fillArea.default_value=this.chartData[this.axis][this.id].splitArea.areaStyle.type;
            },
            mergeProp(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].splitArea==undefined){
                    Vue.set(copyObject[this.axis][this.id],"splitArea",{})
                    Vue.set(copyObject[this.axis][this.id].splitArea,"areaStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].splitArea,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            mergePropDeep(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].splitArea==undefined){
                    Vue.set(copyObject[this.axis][this.id],"splitArea",{})
                    Vue.set(copyObject[this.axis][this.id].splitArea,"areaStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].splitArea.areaStyle,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleSplitAreaShowChange(val){
                this.mergeProp("show",val)
            },
            handleSplitAreaStyleColorChange(val){
                this.mergePropDeep("color",val)
            }
        }

    }
</script>

<style scoped>

</style>