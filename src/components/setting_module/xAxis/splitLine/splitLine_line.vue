<template>
    <div class="padding_10">
        <s_radio  @setValue="handleSplitLineShowChange" :title="showLine.title" :default_option="showLine.default_option" :options="showLine.options"/>
        <p class="setting_group_name">线条特定样式设置</p>
        <s_color-picker  @setValue="handleSplitLineStyleColorChange"  :title="lineColor.title" :default_color="lineColor.defaultColor"  />
        <s_slider  @setValue="handleSplitLineStyleWidthChange"   :title="lineWidth.title" :default_value="lineWidth.default" :max="lineWidth.max" :unit="lineWidth.unit"/>
        <s_radio  @setValue="handleSplitLineTypeChange" :title="lineType.title" :default_option="lineType.default_option" :options="lineType.options"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "../../original_components/s_slider";
    import s_radio from "../../original_components/s_radio";
    import s_colorPicker from "../../original_components/s_colorPicker";
    export default {
        name: "splitLine_line",
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
        data(){
            return{
                showLine:{
                    title:"网格线是否显示",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                lineColor:{
                    title:"线条颜色",
                    defaultColor:"#f0000"
                },
                lineWidth:{
                    title:"线条宽度",
                    max:20,
                    default:10,
                    unit:"px"
                },
                lineType:{
                    title:"线条类型",
                    default_option:"solid",
                    options:[
                        { id:1,value:"solid",name:"实线"},
                        { id:2,value:"dashed",name:"虚线"},
                        { id:3,value:"dotted",name:"点状线"}
                    ]
                },
            }
        },
        components:{
            s_radio,
            s_colorPicker,
            s_slider
        },
        created() {
        this.initData();
            },
        methods:{
            initData(){
                this.showLine.default_option=this.chartData[this.axis][this.id].splitLine.show;
                this.lineColor.defaultColor=this.chartData[this.axis][this.id].splitLine.lineStyle.color;
                this.lineWidth.default=this.chartData[this.axis][this.id].splitLine.lineStyle.width;
                this.lineType.default_option=this.chartData[this.axis][this.id].splitLine.lineStyle.type;
            },
            mergeProp(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].splitLine==undefined){
                    Vue.set(copyObject[this.axis][this.id],"splitLine",{})
                    Vue.set(copyObject[this.axis][this.id].splitLine,"lineStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].splitLine,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            mergePropDeep(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].splitLine==undefined){
                    Vue.set(copyObject[this.axis][this.id],"splitLine",{})
                    Vue.set(copyObject[this.axis][this.id].splitLine,"lineStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].splitLine.lineStyle,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleSplitLineShowChange(val){
                this.mergeProp("show",val)
            },
            handleSplitLineStyleColorChange(val){
                this.mergePropDeep("color",val)
            },
            handleSplitLineStyleWidthChange(val){
                this.mergePropDeep("width",val)
            },
            handleSplitLineTypeChange(val){
                this.mergePropDeep("type",val)
            }
        }
    }
</script>

<style scoped>

</style>