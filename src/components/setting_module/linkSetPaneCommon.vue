<template>
    <div id="linkSetPane" class="padding_10">
        <s_slider @setValue="handleChartHeight"
                  :title="height_set.title"
                  :max="height_set.max"
                  :default_value="height_set.default"
                  :unit="height_set.unit"
        />
        <s_slider @setValue="handleChartWidth"
                  :title="width_set.title"
                  :max="width_set.max"
                  :default_value="width_set.default"
                  :unit="width_set.unit"
        />
        <s_radio v-if="typeOfChart=='line'||typeOfChart=='bar'" @setValue="handleChartTypeChange" :title="chartType.title" :default_option="chartType.default_option" :options="chartType.options"/>
        <s_radio v-if="typeOfChart=='map'"   @setValue="handleChartThemeChange" :title="chartThemeMap.title" :default_option="chartThemeMap.default_option" :options="chartThemeMap.options"/>
        <s_radio  v-else @setValue="handleChartThemeChange" :title="chartTheme.title" :default_option="chartTheme.default_option" :options="chartTheme.options"/>
        <s_radio v-if="typeOfChart=='line'||typeOfChart=='bar'" v-show="isShow" @setValue="handleLineTypeChange" :title="lineType.title" :default_option="lineType.default_option" :options="lineType.options"/>
        <s_radio  v-if="typeOfChart=='line'||typeOfChart=='bar'"  @setValue="handleSwitchXYChange" :title="switchXY.title" :default_option="switchXY.default_option" :options="switchXY.options"/>
        <s_radio v-if="typeOfChart=='line'"  @setValue="handleChartModeChange" :title="chartMode.title" :default_option="chartMode.default_option" :options="chartMode.options"/>
        <s_radio v-if="typeOfChart!='pie'&&typeOfChart!='map'"  @setValue="handleEnableInsiderControllerChange" :title="enableInsiderController.title" :default_option="enableInsiderController.default_option" :options="enableInsiderController.options"/>
        <s_radio v-if="typeOfChart!='pie'&&typeOfChart!='map'"  @setValue="handleEnableSliderControllerChange" :title="enableSliderController.title" :default_option="enableSliderController.default_option" :options="enableSliderController.options"/>
        <s_slider v-if="typeOfChart!='pie'&&typeOfChart!='map'" v-show="isShow"  @setValue="handleLogoPxChange"
                  :title="logoSize.title"
                  :max="logoSize.max"
                  :default_value="logoSize.default"
                  :unit="logoSize.unit"
        />
        <p class="setting_group_name">通用颜色</p>
        <s_colorPicker @setValue="handleBGColorChange"
                       :title="bgColor.title"
                       :default_color="bgColor.defaultColor"/>

    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "./original_components/s_slider";
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";

    export default {
        name: "linkSetPane",
        data(){
            return{
                height_set:{
                    title:"图的高度",
                    max:800,
                    default:300,
                    unit:"px"
                },
                width_set:{
                    title:"图的宽度",
                    max:1500,
                    default:800,
                    unit:"px"
                },
                chartType:{
                    title: "系列的图形类型",
                    default_option:"line",
                    options:[
                        { id:1,value:"line",name:"折线"},
                        { id:2,value:"bar",name:"柱"},
                    ]

                },
                enableSliderController:{
                    title: "启用滑块控制器",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                enableInsiderController:{
                    title: "启用内置鼠标控制器",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                switchXY:{
                    title: "交换xy轴",
                    default_option:false,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]

                },
                lineType:{
                    title: "折线转为平滑曲线",
                    default_option:true,
                    options:[
                        { id:1,value:true,name:"是"},
                        { id:2,value:false,name:"否"},
                    ]
                },
                chartTheme:{
                    title: "主题",
                    default_option:"",
                    options:[
                        { id:9,value:"",name:"none"},
                        { id:1,value:"blue",name:"blue"},
                        { id:2,value:"caravan",name:"caravan"},
                        { id:3,value:"bee-inspired",name:"bee-inspired"},
                        { id:4,value:"carp",name:"carp"},
                        { id:5,value:"forest",name:"forest"},
                        { id:7,value:"jazz",name:"jazz"},
                        { id:8,value:"mint",name:"mint"},
                        { id:10,value:"fruit",name:"fruit"},
                        { id:11,value:"london",name:"london"},
                        { id:12,value:"red",name:"red"},
                        { id:14,value:"tech-blue",name:"tech-blue"},
                        { id:15,value:"sakura",name:"sakura"},
                        { id:16,value:"shine",name:"shine"},
                        { id:17,value:"helianthus",name:"helianthus"},
                        { id:18,value:"roma",name:"roma"},
                        { id:19,value:"royal",name:"royal"},
                        { id:20,value:"macarons",name:"macarons"},
                        { id:21,value:"macarons2",name:"macarons2"},
                        { id:22,value:"inspired",name:"inspired"},
                        { id:23,value:"infographic",name:"infographic"},
                        { id:24,value:"green",name:"green"},
                        { id:25,value:"dark-mushroom",name:"dark-mushroom"},
                    ]
                },
                chartThemeMap:{
                    title: "主题",
                    default_option:"",
                    options:[
                        { id:9,value:"",name:"none"},
                        { id:1,value:"blue",name:"blue"},
                        { id:2,value:"caravan",name:"caravan"},
                        { id:3,value:"bee-inspired",name:"bee-inspired"},
                        { id:4,value:"carp",name:"carp"},
                        { id:5,value:"forest",name:"forest"},
                        { id:7,value:"jazz",name:"jazz"},
                        { id:8,value:"mint",name:"mint"},
                        { id:10,value:"fruit",name:"fruit"},
                        { id:11,value:"london",name:"london"},
                        { id:12,value:"red",name:"red"},
                        { id:14,value:"tech-blue",name:"tech-blue"},
                        { id:15,value:"sakura",name:"sakura"},
                        { id:16,value:"shine",name:"shine"},
                        { id:18,value:"roma",name:"roma"},
                        { id:19,value:"royal",name:"royal"},
                        { id:20,value:"macarons",name:"macarons"},
                        { id:21,value:"macarons2",name:"macarons2"},
                        { id:22,value:"inspired",name:"inspired"},
                        { id:23,value:"infographic",name:"infographic"},

                    ]
                    
                },
                chartMode:{
                    title: "显示模式",
                    default_option:1,
                    options:[
                        { id:1,value:1,name:"正常"},
                        { id:2,value:2,name:"面积图"},
                    ]
                },

                logoSize:{
                    title: "小标志大小",
                    max:80,
                    default:10,
                    unit:"px"
                },
                bgColor:{
                    title: "图整体背景颜色",
                    defaultColor:"#0000"
                },
                isShow:true
            }
        },
        computed: {
            ...mapState({
                chartData:state=> state.chartList[state.currentChartId],
            })
        },
        props:{
            typeOfChart:{
                type:String,
                default:"",
                required:false
            }
        },
        components:{
            s_slider,
            s_radio,
            s_colorPicker
        },
        created(){
            var that =this;
            that.initData();

        },
        methods:{
            initData(){
                this.height_set.default=parseInt( this.chartData.otherSetting.chartHeight);
                this.width_set.default=parseInt( this.chartData.otherSetting.chartWidth);
                this.chartTheme.default_option= this.chartData.otherSetting.chartTheme;
                this.chartType.default_option=""
                this.lineType.default_option=""
                this.logoSize.default=5
                this.bgColor.defaultColor=this.chartData.backgroundColor;
                if(this.typeOfChart!="pie"&&this.typeOfChart!="map"){
                this.enableSliderController.default_option=this.chartData.dataZoom[0].show;
                this.enableInsiderController.default_option=!this.chartData.dataZoom[2].disabled;
                }
            },
            handleChartHeight(val){
                let copyObject=this.chartData;
                copyObject.otherSetting.chartHeight=val.new_value+"px";
                this.$store.commit("setChartData",copyObject)
            },
            handleChartWidth(val){
                let copyObject=this.chartData;
                copyObject.otherSetting.chartWidth=val.new_value+"px";
                this.$store.commit("setChartData",copyObject)
            },
            handleChartTypeChange(val){

                let copyObject=this.chartData;
                let length=copyObject.series.length;
                for (let i=0;i<length;i++){
                    copyObject.series[i].type=val.new_value;
                }
                this.$store.commit("setChartData",copyObject)
                val.new_value=="line"?this.isShow=true:this.isShow=false;

            },
            handleChartThemeChange(val){
                let copyObject=this.chartData;
                copyObject.otherSetting.chartTheme=val.new_value;
                this.$store.commit("setChartData",copyObject)
            },
            handleLineTypeChange(val){
                let copyObject=this.chartData;
                let length=copyObject.series.length;
                for (let i=0;i<length;i++){
                    //Vue.set( target, key, value ) 设置数组元素/向响应式对象添加属性
                    Vue.set(copyObject.series[i], 'smooth',  val.new_value)
                }
                this.$store.commit("setChartData",copyObject)
            },
            handleSwitchXYChange(val){
                    let copyObject=this.chartData;
                    let xAxis=JSON.stringify(copyObject.xAxis)
                    let yAxis=JSON.stringify(copyObject.yAxis)
                    copyObject.xAxis=JSON.parse(yAxis);
                    copyObject.yAxis=JSON.parse(xAxis);
                    this.$store.commit("setChartData",copyObject)
            },
            handleLogoPxChange(val){
                let copyObject=this.chartData;
                let length=copyObject.series.length;
                for (let i=0;i<length;i++){
                    //Vue.set( target, key, value ) 设置数组元素/向响应式对象添加属性
                    Vue.set(copyObject.series[i], 'symbolSize',  val.new_value)
                }
                this.$store.commit("setChartData",copyObject)
            },
            handleBGColorChange(val){
                let copyObject=this.chartData;
                    //Vue.set( target, key, value ) 设置数组元素/向响应式对象添加属性
                    Vue.set(copyObject, 'backgroundColor',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleChartModeChange(val){
                let copyObject=this.chartData;
                let len=copyObject.series.length;
                let res=val.new_value;
                switch (res) {
                    case 1:

                        for (let i = 0; i <len ; i++) {
                            Vue.set(copyObject.series[i].itemStyle.normal.areaStyle, 'opacity',  0)
                        }
                        break;
                    case 2:
                        for (let i = 0; i <len ; i++) {
                            Vue.set(copyObject.series[i].itemStyle.normal.areaStyle, 'opacity',  1)
                        }
                        break;



                }
                this.$store.commit("setChartData",copyObject)


            },
          handleEnableSliderControllerChange(val){
                let copyObject=this.chartData;
                //Vue.set( target, key, value ) 设置数组元素/向响应式对象添加属性
                Vue.set(copyObject.dataZoom[0], 'show',  val.new_value)
                Vue.set(copyObject.dataZoom[1], 'show',  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            handleEnableInsiderControllerChange(val){
                let copyObject=this.chartData;
                //Vue.set( target, key, value ) 设置数组元素/向响应式对象添加属性
                Vue.set(copyObject.dataZoom[2], 'disabled',  !val.new_value)
                Vue.set(copyObject.dataZoom[3], 'disabled',  !val.new_value)
                this.$store.commit("setChartData",copyObject)
            }
        }
    }
</script>

<style scoped>

</style>