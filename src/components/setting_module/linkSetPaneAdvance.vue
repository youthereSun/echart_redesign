<template>
    <div id="linkSetPaneAdvance" class="padding_10">
        <p class="setting_group_name">拖拽重计算</p>
        <s_radio @setValue="handleDragResize" :title="dragResize.title" :default_option="dragResize.default_option" :options="dragResize.options"/>
        <s_colorPicker @setValue="handleBorderColorChange"
                       :title="borderColor.title"
                       :default_color="borderColor.defaultColor"/>
        <s_colorPicker @setValue="handleZhanWeiColorChange"
                       :title="zhanWeiColor.title"
                       :default_color="zhanWeiColor.defaultColor"/>
        <p class="setting_group_name">动画</p>
        <s_radio @setValue="handleInitialAnimationChange" :title="initialAnimation.title" :default_option="initialAnimation.default_option" :options="initialAnimation.options"/>
        <s_slider @setValue="handleAnimationRangeChange"
                  :title="animationRange.title"
                  :max="animationRange.max"
                  :default_value="animationRange.default"
                  :unit="animationRange.unit"
        />
        <s_slider @setValue="handleAnimationDurationChange"
                  :title="animationDuration.title"
                  :max="animationDuration.max"
                  :default_value="animationDuration.default"
                  :unit="animationDuration.unit"
        />
        <s_radio :showBorder="showBorder" @setValue="handleAnimationTypeChange" :title="animationType.title" :default_option="animationType.default_option" :options="animationType.options"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";
    import s_slider from "./original_components/s_slider";
    import Vue from 'vue'
    export default {
        name: "linkSetPaneAdvance",
        components:{
            s_colorPicker,
            s_radio,
            s_slider
        },
        computed: {
            ...mapState({
                chartData:state=> state.chartList[state.currentChartId],
            })
        },
        created() {
            this.initData();
        },
        data(){
            return{
                showBorder:true,
                dragResize:{
                    title:"启用拖拽重计算",
                    default_option:true,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]

                },
                borderColor:{
                    title:"拖拽重计算边框颜色",
                    defaultColor:"f0000"
                },
                zhanWeiColor:{
                    title:"拖拽重计算占位提示颜色",
                    defaultColor:"f0000"
                },
                initialAnimation:{
                    title:"图表初始化动画",
                    default_option:true,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                animationRange:{
                    title:"阈值",
                    max:3000,
                    default:1000,
                    unit:"px"
                },
                animationDuration:{
                    title:"动画时长",
                    max:5000,
                    default:2000,
                    unit:"ms"
                },
                animationType:{
                    title:"动画类型",
                    default_option:'Linear',
                    options:[
                        { id:1,value:'Linear',name:"Linear"},
                        { id:2,value:'QuadraticIn',name:"QuadraticIn"},
                        { id:3,value:'QuadraticOut',name:"QuadraticOut"},
                        { id:4,value:'QuadraticInOut',name:"QuadraticInOut"},
                        { id:5,value:'CubicIn',name:"CubicIn"},
                        { id:6,value:'CubicOut',name:"CubicOut"},
                        { id:7,value:'CubicInOut',name:"CubicInOut"},
                        { id:8,value:'QuarticIn',name:"QuarticIn"},
                        { id:9,value:'QuarticOut',name:"QuarticOut"},
                        { id:10,value:'QuarticInOut',name:"QuarticInOut"},
                        { id:11,value:'QuinticIn',name:"QuinticIn"},
                        { id:12,value:'QuinticOut',name:"QuinticOut"},
                        { id:13,value:'QuinticInOut',name:"QuinticInOut"},
                        { id:14,value:'SinusoidalIn',name:"SinusoidalIn"},
                        { id:15,value:'SinusoidalOut',name:"SinusoidalOut"},
                        { id:16,value:'SinusoidalInOut',name:"SinusoidalInOut"},
                        { id:17,value:'ExponentialIn',name:"ExponentialIn"},
                        { id:18,value:'ExponentialOut',name:"ExponentialOut"},
                        { id:19,value:'ExponentialInOut',name:"ExponentialInOut"},
                        { id:20,value:'ElasticIn',name:"ElasticIn"},
                        { id:21,value:'ElasticOut',name:"ElasticOut"},
                        { id:22,value:'ElasticInOut',name:"ElasticInOut"},
                        { id:23,value:'BackIn',name:"BackIn"},
                        { id:24,value:'BackOut',name:"BackOut"},
                        { id:25,value:'BackInOut',name:"BackInOut"},
                        { id:26,value:'BounceIn',name:"BounceIn"},
                        { id:27,value:'BounceOut',name:"BounceOut"},
                        { id:28,value:'BounceInOut',name:"BounceInOut"},
                    ]
                },
            }
        },
        methods:{
            initData(){
                this.dragResize.default_option=this.chartData.calculable;
                this.borderColor.defaultColor=this.chartData.calculableColor;
                this.zhanWeiColor.defaultColor=this.chartData.calculableHolderColor;
                this.initialAnimation.default_option=this.chartData.animation;
                this.animationRange.default=this.chartData.animationThreshold;
                this.animationDuration.default=this.chartData.animationDuration;
                this.animationType.default_option=this.chartData.animationEasing;

            },
            handleDragResize(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'calculable',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleBorderColorChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'calculableColor',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleZhanWeiColorChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'calculableHolderColor',  val.new_value)
                this.$store.commit("setChartData",copyObject)

            },
            handleInitialAnimationChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'animation',  val.new_value)
                this.$store.commit("setChartData",copyObject)

            },
            handleAnimationRangeChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'animationThreshold',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleAnimationDurationChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'animationDuration',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleAnimationTypeChange(val){
                let copyObject=this.chartData;
                Vue.set(copyObject, 'animationEasing',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            }
        }
    }
</script>

<style scoped>

</style>