<template>
    <div>
        <p class="setting_group_name">饼图设置（针对本系列）</p>
        <s_radio @setValue="handleRoseTypeChange"  :title="roseType.title" :default_option="roseType.default_option" :options="roseType.options"/>
        <s_slider
                @setValue="handleRadiusChange"
                :title="radius.title"
                :max="radius.max"
                :default_value="radius.default"
                :unit="radius.unit"
        />
        <s_slider
                @setValue="handleInnerRadiusChange"
                :title="innerRadius.title"
                :max="innerRadius.max"
                :default_value="innerRadius.default"
                :unit="innerRadius.unit"
        />
        <s_slider
                @setValue="handleStartAngleChange"
                :title="startAngle.title"
                :max="startAngle.max"
                :min="startAngle.min"
                :default_value="startAngle.default"
                :unit="startAngle.unit"
        />
        <s_slider
                @setValue="handleMinAngleChange"
                :title="minAngle.title"
                :max="minAngle.max"
                :default_value="minAngle.default"
                :min="minAngle.min"
                :unit="minAngle.unit"
        />
        <s_radio @setValue="handleSelectedModeChange"  :title="selectedMode.title" :default_option="selectedMode.default_option" :options="selectedMode.options"/>
        <s_slider
                @setValue="handleSelectedOffsetChange"
                :title="selectedOffset.title"
                :max="selectedOffset.max"
                :default_value="selectedOffset.default"
                :min="selectedOffset.min"
                :unit="selectedOffset.unit"
        />
        <s_radio @setValue="handleShowLabelLineChange"  :title="showLabelLine.title" :default_option="showLabelLine.default_option" :options="showLabelLine.options"/>
        <s_radio @setValue="handleShowLabelChange"  :title="showLabel.title" :default_option="showLabel.default_option" :options="showLabel.options"/>
        <s_colorPicker
                @setValue="handleBorderColorChange"
                :title="itemStyle.borderColor.title"
                :default_color="itemStyle.borderColor.defaultColor"
        />
        <s_slider
                @setValue="handleBorderWidthChange"
                :title="itemStyle.borderWidth.title"
                :max="itemStyle.borderWidth.max"
                :default_value="itemStyle.borderWidth.default"
                :unit="itemStyle.borderWidth.unit"
        />


    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";
    import s_slider from "./original_components/s_slider";
    export default {
        name: "pieSeriesSetting",
        components:{
            s_radio,
            s_colorPicker,
            s_slider
        },
        computed: {
            ...mapState({
                chartData:state=> state.chartList[state.currentChartId],
            })
        },
        props: {
            index: {
                type: Number,
                required: true
            }
        },
        data(){
            return{
                roseType:{
                    title:"南丁格尔玫瑰图模式",
                    default_option:"",
                    options:[
                        { id:1,value:'',name:"普通模式"},
                        { id:2,value:'radius',name:"半径模式"},
                        { id:3,value:'area',name:"面积模式"}
                    ]

                },
                radius:{
                    title: "外半径",
                    max:400,
                    default:100,
                    unit:"px"
                },
                innerRadius:{
                    title: "内半径",
                    max:100,
                    default:0,
                    unit:"px"
                },
                startAngle:{
                    title: "起始角度",
                    max:180,
                    min:-180,
                    default:100,
                    unit:"°"
                },
                minAngle:{
                    title: "最小角度",
                        max:180,
                        min:-180,
                        default:100,
                        unit:"°"
                },
                selectedMode:{
                     title:"鼠标点选模式",
                         default_option:"single",
                         options:[
                         { id:1,value:false,name:"不可选"},
                         { id:2,value:'single',name:"单选"},
                         { id:3,value:'multiple',name:"多选"}
                     ]

                 },
                selectedOffset:{
                    title: "选中偏移量",
                    max:180,
                    min:-180,
                    default:100,
                    unit:"°"
                },
                showLabelLine:{
                    title:"显示标签线",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},

                    ]

                },
                showLabel:{
                    title:"显示标签",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]

                },
                itemStyle:{
                    borderColor:{
                        title: "边框颜色",
                        defaultColor:"#ffffff"
                    },
                    borderWidth:{
                        title: "边框宽度",
                        max:30,
                        default:5,
                        unit:"px"
                    }
                }
            }
        },
        created() {
                this.initData();

            },
        methods:{
            initData(){
                this.roseType.default_option=this.chartData.series[this.index-1].roseType;
                this.radius.default=this.chartData.series[this.index-1].radius[1]
                this.innerRadius.default=this.chartData.series[this.index-1].radius[0];
                this.startAngle.default=this.chartData.series[this.index-1].startAngle;
                this.minAngle.default=this.chartData.series[this.index-1].minAngle;
                this.selectedMode.default_option=this.chartData.series[this.index-1].selectedMode;
                this.selectedOffset.default=this.chartData.series[this.index-1].selectedOffset;
                this.showLabelLine.default_option=this.chartData.series[this.index-1].itemStyle.normal.labelLine.show;
                this.showLabel.default_option=this.chartData.series[this.index-1].itemStyle.normal.label.show;

                this.itemStyle.borderColor.defaultColor=this.chartData.series[this.index-1].itemStyle.normal.borderColor;
                this.itemStyle.borderWidth.default=this.chartData.series[this.index-1].itemStyle.normal.borderWidth;
            },
            mergeProp(propName,val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1], propName,  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleRoseTypeChange(val){

                this.mergeProp("roseType",val)

            },
            handleRadiusChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].radius, 1,  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleInnerRadiusChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].radius, 0,  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleStartAngleChange(val){
                this.mergeProp("startAngle",val)
            },
            handleMinAngleChange(val){
                this.mergeProp("minAngle",val)
            },
            handleSelectedModeChange(val){
                this.mergeProp("selectedMode",val)
            },
            handleSelectedOffsetChange(val){
                this.mergeProp("selectedOffset",val)
            },
            handleShowLabelLineChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].itemStyle.normal.labelLine, "show",  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleShowLabelChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].itemStyle.normal.label, "show",  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleBorderColorChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].itemStyle.normal, "borderColor",  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleBorderWidthChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject.series[this.index-1].itemStyle.normal, "borderWidth",  val.new_value)
                this.$store.commit("setChartData",copyObject)
            }
        }

    }
</script>

<style scoped>

</style>