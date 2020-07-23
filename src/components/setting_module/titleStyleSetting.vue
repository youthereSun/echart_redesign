<template>
    <div class="padding_10">
        <p class="setting_group_name">标题块位置</p>
        <s_radio @setValue="handleXChange" :title="horizonPosition.title" :default_option="horizonPosition.default_option" :options="horizonPosition.options"/>
        <s_radio @setValue="handleYChange" :title="verticalPosition.title" :default_option="verticalPosition.default_option" :options="verticalPosition.options"/>
        <s_radio @setValue="handleTextAlignChange"  :title="alignment.title" :default_option="alignment.default_option" :options="alignment.options"/>
        <p class="setting_group_name">标题块外观</p>
        <s_colorPicker
                @setValue="handleBackgroundColorChange"
                :title="titleBlockSetting_bg.title"
                :default_color="titleBlockSetting_bg.defaultColor"
        />
        <s_slider
                  @setValue="handleBorderWidthChange"
                  :title="titleBlockSetting_border_width.title"
                  :max="titleBlockSetting_border_width.max"
                  :default_value="titleBlockSetting_border_width.default"
                  :unit="titleBlockSetting_border_width.unit"
        />
        <s_colorPicker
                @setValue="handleBorderColorChange"
                :title="titleBlockSetting_border_color.title"
                :default_color="titleBlockSetting_border_color.defaultColor"
        />
        <s_slider
                @setValue="handlePaddingChange"
                :title="titleBlockSetting_border_padding.title"
                :max="titleBlockSetting_border_padding.max"
                :default_value="titleBlockSetting_border_padding.default"
                :unit="titleBlockSetting_border_padding.unit"
        />
        <s_slider
                @setValue="handleItemGapChange"
                :title="titleBlockSetting_border_margin.title"
                :max="titleBlockSetting_border_margin.max"
                :default_value="titleBlockSetting_border_margin.default"
                :unit="titleBlockSetting_border_margin.unit"
        />
        <p class="setting_group_name">主标题文本样式</p>
        <s_colorPicker
                @setValue="handleTextStyleColorChange"
                :title="mainTitle.textColor.title"
                :default_color="mainTitle.textColor.defaultColor"
        />
        <s_slider
                @setValue="handleTextStyleFontsizeChange"
                :title="mainTitle.fontSize.title"
                :max="mainTitle.fontSize.max"
                :default_value="mainTitle.fontSize.default"
                :unit="mainTitle.fontSize.unit"
        />
        <s_radio  @setValue="handleTextStyleFontStyleChange"  :title="mainTitle.fontStyle.title" :default_option="mainTitle.fontStyle.default_option" :options="mainTitle.fontStyle.options"/>
        <s_radio  @setValue="handleTextStyleFontWeightChange" :title="mainTitle.fontWeight.title" :default_option="mainTitle.fontWeight.default_option" :options="mainTitle.fontWeight.options"/>
        <s_radio  @setValue="handleTextStyleAlignChange" :title="mainTitle.textAlign.title" :default_option="mainTitle.textAlign.default_option" :options="mainTitle.textAlign.options"/>
        <s_radio  @setValue="handleTextStyleBaselineChange" :title="mainTitle.verticalAlign.title" :default_option="mainTitle.verticalAlign.default_option" :options="mainTitle.verticalAlign.options"/>
        <p class="setting_group_name">副标题文本样式</p>
        <s_colorPicker
                @setValue="handleSubTextStyleColorChange"
                :title="subTitle.textColor.title"
                :default_color="subTitle.textColor.defaultColor"
        />
        <s_slider
                @setValue="handleSubTextStyleFontsizeChange"
                :title="subTitle.fontSize.title"
                :max="subTitle.fontSize.max"
                :default_value="subTitle.fontSize.default"
                :unit="subTitle.fontSize.unit"
        />
        <s_radio @setValue="handleSubTextStyleFontStyleChange"  :title="subTitle.fontStyle.title" :default_option="subTitle.fontStyle.default_option" :options="subTitle.fontStyle.options"/>
        <s_radio  @setValue="handleSubTextStyleFontWeightChange" :title="subTitle.fontWeight.title" :default_option="subTitle.fontWeight.default_option" :options="subTitle.fontWeight.options"/>
        <s_radio  @setValue="handleSubTextStyleAlignChange" :title="subTitle.textAlign.title" :default_option="subTitle.textAlign.default_option" :options="subTitle.textAlign.options"/>
        <s_radio  @setValue="handleSubTextStyleBaselineChange" :title="subTitle.verticalAlign.title" :default_option="subTitle.verticalAlign.default_option" :options="subTitle.verticalAlign.options"/>

    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";
    import s_slider from "./original_components/s_slider";
    export default {
        name: "titleStyleSetting",
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
        data(){
            return{
                horizonPosition:{
                    title:"水平安放位置",
                    default_option:"left",
                    options:[
                        { id:1,value:'left',name:"居左"},
                        { id:2,value:'center',name:"居中"},
                        { id:3,value:'right',name:"居右"}
                    ]

                },
                verticalPosition:{
                    title:"垂直安放位置",
                    default_option:'top',
                    options:[
                        { id:1,value:'top',name:"居上"},
                        { id:2,value:'middle',name:"居中"},
                        { id:3,value:'bottom',name:"居下"}
                    ]
                },
                alignment:{
                    title:"水平对齐方式",
                    default_option:"left",
                    options:[
                        { id:1,value:'left',name:"居左"},
                        { id:2,value:'center',name:"居中"},
                        { id:3,value:'right',name:"居右"}
                        ]
                },
                titleBlockSetting_bg:{
                    title: "标题背景颜色",
                    defaultColor:"#FFFFFF"
                },
                titleBlockSetting_border_width:{
                    title: "标题边框线宽",
                    max:20,
                    default:0,
                    unit:"px"
                },
                titleBlockSetting_border_color:{
                    title: "标题边框颜色",
                    defaultColor:"#FFFFFF"
                },
                titleBlockSetting_border_padding:{
                    title: "标题内边距",
                    max:10,
                    default:0,
                    unit:"px"
                },
                titleBlockSetting_border_margin:{
                    title: "主副标题纵向间隔",
                    max:10,
                    default:0,
                    unit:"px"
                },
                mainTitle:{
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


                },
                subTitle:{
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
        created() {
        this.initData();
            },
        methods:{
            initData(){
                this.horizonPosition.default_option=this.chartData.title.x;
                this.verticalPosition.default_option=this.chartData.title.y;
                this.alignment.default_option=this.chartData.title.textAlign;
                this.titleBlockSetting_bg.defaultColor=this.chartData.title.backgroundColor;
                this.titleBlockSetting_border_width.default=this.chartData.title.borderWidth;
                this.titleBlockSetting_border_color.defaultColor=this.chartData.title.borderColor;
                this.titleBlockSetting_border_padding.default=this.chartData.title.padding;
                this.titleBlockSetting_border_margin.default=this.chartData.title.itemGap;

                this.mainTitle.textColor.defaultColor=this.chartData.title.textStyle.color;
                this.mainTitle.fontSize.default=this.chartData.title.textStyle.fontSize;
                this.mainTitle.fontWeight.default_option=this.chartData.title.textStyle.fontWeight;
                this.mainTitle.textAlign.default_option=this.chartData.title.textStyle.align;
                this.mainTitle.verticalAlign.default_option=this.chartData.title.textStyle.baseline;
                this.subTitle.textColor.defaultColor=this.chartData.title.subtextStyle.color;
                this.subTitle.fontSize.default=this.chartData.title.subtextStyle.fontSize;
                this.subTitle.fontWeight.default_option=this.chartData.title.subtextStyle.fontWeight;
                this.subTitle.textAlign.default_option=this.chartData.title.subtextStyle.align;
                this.subTitle.verticalAlign.default_option=this.chartData.title.subtextStyle.baseline;

            },
            mergeProps(propName,val){
                let copyObject=this.chartData;
                Vue.set(copyObject.title, propName,  val.new_value)
                this.$store.commit("setChartData",copyObject)
            },
            mergePropsMain(propName,val){
                let copyObject = this.chartData;
                if (copyObject.title.textStyle == undefined) {//没有改设置项
                    Vue.set(copyObject.title, 'textStyle', {})
                    Vue.set(copyObject.title.textStyle, propName, val.new_value)
                } else {
                    Vue.set(copyObject.title.textStyle, propName, val.new_value)
                }
                this.$store.commit("setChartData", copyObject)
            },
            mergePropsSub(propName,val){
                let copyObject = this.chartData;
                if (copyObject.title.subtextStyle == undefined) {//没有改设置项
                    Vue.set(copyObject.title, 'subtextStyle', {})
                    Vue.set(copyObject.title.subtextStyle, propName, val.new_value)
                } else {
                    Vue.set(copyObject.title.subtextStyle, propName, val.new_value)
                }
                this.$store.commit("setChartData", copyObject)
            },
            handleXChange(val){
                this.mergeProps("x",val)
            },
            handleYChange(val){
                this.mergeProps("y",val)
            },
            handleTextAlignChange(val){
                this.mergeProps("textAlign",val)
            },
            handleBackgroundColorChange(val){
                this.mergeProps("backgroundColor",val)
            },
            handleBorderWidthChange(val){
                this.mergeProps("borderWidth",val)
            },
            handleBorderColorChange(val){
                this.mergeProps("borderColor",val)
            },
            handlePaddingChange(val){
                this.mergeProps("padding",val)
            },
            handleItemGapChange(val){
                this.mergeProps("itemGap",val)
            },
            handleTextStyleColorChange(val){
                this.mergePropsMain("color",val)
            },
            handleTextStyleFontsizeChange(val){
                this.mergePropsMain("fontSize",val)
            },
            handleTextStyleFontStyleChange(val){
                this.mergePropsMain("fontStyle",val)
            },
            handleTextStyleFontWeightChange(val){
                this.mergePropsMain("fontWeight",val)
            },
            handleTextStyleAlignChange(val){
                this.mergePropsMain("align",val)
            },
            handleTextStyleBaselineChange(val){
                this.mergePropsMain("baseline",val)
            },
            handleSubTextStyleColorChange(val){
                this.mergePropsSub("color",val)
            },
            handleSubTextStyleFontsizeChange(val){
                this.mergePropsSub("fontSize",val)
            },
            handleSubTextStyleFontStyleChange(val){
                this.mergePropsSub("fontStyle",val)
            },
            handleSubTextStyleFontWeightChange(val){
                this.mergePropsSub("fontWeight",val)
            },
            handleSubTextStyleAlignChange(val){
                this.mergePropsSub("align",val)
            },
            handleSubTextStyleBaselineChange(val){
                this.mergePropsSub("baseline",val)
            }
        }
    }
</script>
