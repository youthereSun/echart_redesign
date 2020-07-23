<template>
    <div class="padding_10">
        <s_radio @setValue="handleAxisTickShowChange" :title="showScale.title" :default_option="showScale.default_option" :options="showScale.options"/>
        <s_slider @setValue="handleAxisTickIntervalChange" :title="scaleInterval.title" :default_value="scaleInterval.default" :max="scaleInterval.max" :unit="scaleInterval.unit"/>
        <s_radio @setValue="handleAxisTickInsideChange" :title="scalePosition.title" :default_option="scalePosition.default_option" :options="scalePosition.options"/>
        <s_slider @setValue="handleAxisTickLengthChange" :title="scaleLength.title" :default_value="scaleLength.default" :max="scaleLength.max" :unit="scaleLength.unit"/>
        <p class="setting_group_name">线条特定样式设置</p>
        <s_color-picker @setValue="handleAxisTickStyleColorChange" :title="scaleColor.title" :default_color="scaleColor.defaultColor"  />
        <s_slider @setValue="handleAxisTickStyleWidthChange" :title="scaleWidth.title" :default_value="scaleWidth.default" :max="scaleWidth.max" :unit="scaleWidth.unit"/>
    </div>
    
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "../../original_components/s_slider";
    import s_radio from "../../original_components/s_radio";
    import s_colorPicker from "../../original_components/s_colorPicker";

    export default {
        name: "calibration_line",
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        data(){
            return{
                showScale:{
                    title:"坐标轴刻度线显示",
                    default_option:true,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                scaleInterval:{
                    title:"刻度显示间隔",
                    max:100,
                    default:0,
                    unit:""
                },
                //axisTick=>inside
                scalePosition:{
                    title:"刻度位置",
                    default_option:true,
                    options:[
                        { id:1,value:true,name:"在内部"},
                        { id:2,value:false,name:"在外部"},
                    ]
                },
                scaleLength:{
                    title:"刻度长度",
                    max:100,
                    default:0,
                    unit:"px"
                },
                scaleColor:{
                    title:"刻度颜色",
                    defaultColor:"#f0000"
                },
                scaleWidth:{
                    title:"线条宽度",
                    max:20,
                    default:10,
                    unit:"px"
                },

            }
        },
        components:{
            s_radio,
            s_colorPicker,
            s_slider

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
        created() {
            this.initData();
        },

        methods:{
            initData(){
                this.showScale.default_option=this.chartData[this.axis][this.id].axisTick.show;
                this.scaleInterval.default=this.chartData[this.axis][this.id].axisTick.interval;
                this.scalePosition.default_option=this.chartData[this.axis][this.id].axisTick.inside;
                this.scaleLength.default=this.chartData[this.axis][this.id].axisTick.length;
                this.scaleColor.defaultColor=this.chartData[this.axis][this.id].axisTick.lineStyle.color;
                this.scaleWidth.default=this.chartData[this.axis][this.id].axisTick.lineStyle.width;
        },
            mergeProp(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].axisTick==undefined){
                    Vue.set(copyObject[this.axis][this.id],"axisTick",{})
                    Vue.set(copyObject[this.axis][this.id].axisTick,"lineStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].axisTick,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            mergePropDeep(propName,val){
                let copyObject=this.chartData;
                if(copyObject[this.axis][this.id].axisTick==undefined){
                    Vue.set(copyObject[this.axis][this.id],"axisTick",{})
                    Vue.set(copyObject[this.axis][this.id].axisTick,"lineStyle",{})
                }
                Vue.set(copyObject[this.axis][this.id].axisTick.lineStyle,propName,val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleAxisTickShowChange(val){
                this.mergeProp("show",val)
            },
            handleAxisTickIntervalChange(val){
                this.mergeProp("interval",val)
            },
            handleAxisTickInsideChange(val){
                this.mergeProp("inside",val)
            },
            handleAxisTickLengthChange(val){
                this.mergeProp("length",val)
            },
            handleAxisTickStyleColorChange(val){
                this.mergePropDeep("color",val)
            },
            handleAxisTickStyleWidthChange(val){
                this.mergePropDeep("width",val)
            }

        }
    }
</script>

<style scoped>

</style>