<template>
    <div class="padding_10">
        <s_radio @setValue="handleTooltipShowChange" :title="showToolTip.title" :default_option="showToolTip.default_option" :options="showToolTip.options"/>
        <p class="setting_group_name">图例外观</p>
        <s_color-picker  @setValue="handleTooltipBGColorChange" :title="outLook.bgColor.title" :default_color="outLook.bgColor.defaultColor"  />
        <s_slider @setValue="handleTooltipBorderWidthChange" :title="outLook.borderWidth.title" :default_value="outLook.borderWidth.default" :max="outLook.borderWidth.max" :unit="outLook.borderWidth.unit" />
        <s_color-picker @setValue="handleTooltipBorderColorChange" :title="outLook.borderColor.title" :default_color="outLook.borderColor.defaultColor"  />
        <s_slider @setValue="handleTooltipBorderRadiusChange"  :title="outLook.borderRadius.title" :default_value="outLook.borderRadius.default" :max="outLook.borderRadius.max" :unit="outLook.borderRadius.unit"/>
        <s_slider @setValue="handleTooltipPaddingChange" :title="outLook.padding.title" :default_value="outLook.padding.default" :max="outLook.padding.max" :unit="outLook.padding.unit"/>
        <p class="setting_group_name">提示文本样式</p>
        <s_colorPicker
                @setValue="handleTextStyleColorChange"
                :title="fontStyle.textColor.title"
                :default_color="fontStyle.textColor.defaultColor"
        />
        <s_slider
                @setValue="handleTextStyleFontSizeChange"
                :title="fontStyle.fontSize.title"
                :max="fontStyle.fontSize.max"
                :default_value="fontStyle.fontSize.default"
                :unit="fontStyle.fontSize.unit"
        />
        <s_radio @setValue="handleTextStyleFontWeightChange"  :title="fontStyle.fontWeight.title" :default_option="fontStyle.fontWeight.default_option" :options="fontStyle.fontWeight.options"/>
        <s_radio @setValue="handleTextStyleFontStyleChange"  :title="fontStyle.fontStyle.title" :default_option="fontStyle.fontStyle.default_option" :options="fontStyle.fontStyle.options"/>
        <s_radio @setValue="handleTextStyleAlignChange"  :title="fontStyle.textAlign.title" :default_option="fontStyle.textAlign.default_option" :options="fontStyle.textAlign.options"/>
        <s_radio @setValue="handleTextStyleBaselineChange"  :title="fontStyle.verticalAlign.title" :default_option="fontStyle.verticalAlign.default_option" :options="fontStyle.verticalAlign.options"/>

    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "../original_components/s_slider";
    import s_radio from "../original_components/s_radio";
    import s_colorPicker from "../original_components/s_colorPicker";
    import s_checkbox from "../original_components/s_checkbox";
    export default {
        name: "tooltipsSetting",
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        data(){
            return{
                showToolTip: {
                    title: "是否使用提示",
                    default_option: false,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"},
                    ]
                },
                outLook:{
                    bgColor:{
                        title:'背景颜色',
                        defaultColor:"#000000"
                    },
                    borderWidth:{
                        title: "边框粗细",
                        max:10,
                        default:0,
                        unit:"px"
                    },
                    borderColor:{
                        title:'边框颜色',
                        defaultColor:"#000000"
                    },
                    borderRadius:{
                        title: "边框圆角",
                        max:10,
                        default:0,
                        unit:"px"
                    },
                    padding:{
                        title: "内边距",
                        max:10,
                        default:0,
                        unit:"px"
                    }
                },
                fontStyle:{
                    textColor:{
                        title:'文本顔色',
                        defaultColor:"#000000"
                    },
                    fontSize:{
                        title: "字体大小",
                        max:100,
                        default:18,
                        unit:"px"
                    },
                    fontStyle:{
                        title:"字体样式",
                        default_option:'normal',
                        options:[
                            { id:1,value:'normal',name:"普通"},
                            { id:2,value:'italic',name:"倾斜"},
                        ]
                    },
                    fontWeight:{
                        title:"字体粗细",
                        default_option:'normal',
                        options:[
                            { id:1,value:'normal',name:"普通"},
                            { id:2,value:'bold',name:"粗体"},
                            { id:3,value:'bolder',name:"更粗"},
                            { id:4,value:'lighter',name:"更细"}
                        ]
                    },
                    textAlign:{
                        title:"文本水平对齐方式",
                        default_option:'left',
                        options:[
                            { id:1,value:'left',name:"居左"},
                            { id:2,value:'center',name:"居中"},
                            { id:3,value:'right',name:"居右"},

                        ]
                    },
                    verticalAlign:{
                        title:"文本垂直对齐方式",
                        default_option:'top',
                        options:[
                            { id:1,value:'top',name:"居上"},
                            { id:2,value:'middle',name:"居中"},
                            { id:3,value:'bottom',name:"居下"},

                        ]
                    }

                }
            }
        },
        components:{
            s_checkbox,
            s_slider,
            s_radio,
            s_colorPicker

        },
        created() {
        this.initData();
            },
        methods:{
            initData(){
                this.showToolTip.default_option=this.chartData.tooltip.show;
                this.outLook.bgColor.defaultColor=this.chartData.tooltip.backgroundColor;
                this.outLook.borderWidth.default=this.chartData.tooltip.borderWidth;
                this.outLook.borderRadius.default=this.chartData.tooltip.borderRadius;
                this.outLook.padding.default=this.chartData.tooltip.padding;
                this.outLook.bgColor.defaultColor=this.chartData.tooltip.backgroundColor;
                this.fontStyle.textColor.defaultColor=this.chartData.tooltip.textStyle.color;
                this.fontStyle.fontSize.default=this.chartData.tooltip.textStyle.fontSize;
                this.fontStyle.fontStyle.default_option=this.chartData.tooltip.textStyle.fontStyle;
                this.fontStyle.fontWeight.default_option=this.chartData.tooltip.textStyle.fontWeight;
                this.fontStyle.textAlign.default_option=this.chartData.tooltip.textStyle.align;
                this.fontStyle.verticalAlign.default_option=this.chartData.tooltip.textStyle.baseline;


            },
            mergeProp(propName,val){
                let copyObject = this.chartData;
                if (copyObject.tooltip == undefined) {
                    Vue.set(copyObject, 'tooltip', {})
                    Vue.set(copyObject.tooltip, 'textStyle', {})
                }
                Vue.set(copyObject.tooltip, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergePropDeep(propName, val) {
                let copyObject = this.chartData;
                if (copyObject.tooltip == undefined) {
                    Vue.set(copyObject, 'tooltip', {})
                    Vue.set(copyObject.tooltip, 'textStyle', {})
                }else {
                    if(copyObject.tooltip.textStyle==undefined){
                        Vue.set(copyObject.tooltip, 'textStyle', {})
                    }
                }
                Vue.set(copyObject.tooltip.textStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleTooltipShowChange(val){
                this.mergeProp("show",val);
            },
            handleTooltipBGColorChange(val){
                this.mergeProp("backgroundColor",val);
            },
            handleTooltipBorderWidthChange(val){
                this.mergeProp("borderWidth",val);
            },
            handleTooltipBorderColorChange(val){
                this.mergeProp("borderColor",val);
            },
            handleTooltipBorderRadiusChange(val){
                this.mergeProp("borderRadius",val);
            },
            handleTooltipPaddingChange(val){
                this.mergeProp("padding",val);
            },
            handleTextStyleColorChange(val) {
                this.mergePropDeep("color", val)
            },
            handleTextStyleFontSizeChange(val) {
                this.mergePropDeep("fontSize", val)
            },
            handleTextStyleFontStyleChange(val) {
                this.mergePropDeep("fontStyle", val)
            },
            handleTextStyleAlignChange(val) {
                this.mergePropDeep("align", val)
            },
            handleTextStyleBaselineChange(val) {
                this.mergePropDeep("baseline", val)
            },
            handleTextStyleFontWeightChange(val) {
                this.mergePropDeep("fontWeight", val)
            }

        }
    }
</script>

<style scoped>

</style>