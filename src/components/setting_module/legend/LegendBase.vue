<template>
    <div class="padding_10">
        <s_radio @setValue="handleLegendShowChange" :title="showLegend.title"
                 :default_option="showLegend.default_option" :options="showLegend.options"/>
        <s_radio @setValue="handleLegendSelectedModeChange" :title="legendMode.title"
                 :default_option="legendMode.default_option" :options="legendMode.options"/>
        <p class="setting_group_name">图例位置</p>
        <s_radio @setValue="handleLegendXChange" :title="legendPosition_x.title"
                 :default_option="legendPosition_x.default_option" :options="legendPosition_x.options"/>
        <s_radio @setValue="handleLegendYChange" :title="legendPosition_y.title"
                 :default_option="legendPosition_y.default_option" :options="legendPosition_y.options"/>
        <s_radio @setValue="handleLegendOrientChange" :title="legendOrigin.title"
                 :default_option="legendOrigin.default_option" :options="legendOrigin.options"/>
        <p class="setting_group_name">图例外观</p>
        <s_color-picker @setValue="handleLegendBackgroundColorChange" :title="legendOutlook.bgColor.title"
                        :default_color="legendOutlook.bgColor.defaultColor"/>
        <s_slider @setValue="handleLegendBorderWidthChange" :title="legendOutlook.borderWidth.title"
                  :default_value="legendOutlook.borderWidth.default" :max="legendOutlook.borderWidth.max"
                  :unit="legendOutlook.borderWidth.unit"/>
        <s_color-picker @setValue="handleLegendBorderColorChange" :title="legendOutlook.borderColor.title"
                        :default_color="legendOutlook.borderColor.defaultColor"/>
        <s_slider @setValue="handleLegendPaddingChange" :title="legendOutlook.padding.title"
                  :default_value="legendOutlook.padding.default" :max="legendOutlook.padding.max"
                  :unit="legendOutlook.padding.unit"/>
        <s_slider @setValue="handleLegendItemWidthChange" :title="legendOutlook.width.title"
                  :default_value="legendOutlook.width.default" :max="legendOutlook.width.max"
                  :unit="legendOutlook.width.unit"/>
        <s_slider @setValue="handleLegendItemHeightChange" :title="legendOutlook.height.title"
                  :default_value="legendOutlook.height.default" :max="legendOutlook.height.max"
                  :unit="legendOutlook.height.unit"/>
        <s_slider @setValue="handleLegendItemGapChange" :title="legendOutlook.itemGap.title"
                  :default_value="legendOutlook.itemGap.default" :max="legendOutlook.itemGap.max"
                  :unit="legendOutlook.itemGap.unit"/>
        <p class="setting_group_name">图例文字样式</p>
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
        <s_radio @setValue="handleTextStyleFontWeightChange" :title="fontStyle.fontWeight.title"
                 :default_option="fontStyle.fontWeight.default_option" :options="fontStyle.fontWeight.options"/>
        <s_radio @setValue="handleTextStyleFontStyleChange" :title="fontStyle.fontStyle.title"
                 :default_option="fontStyle.fontStyle.default_option" :options="fontStyle.fontStyle.options"/>
        <s_radio @setValue="handleTextStyleAlignChange" :title="fontStyle.textAlign.title"
                 :default_option="fontStyle.textAlign.default_option" :options="fontStyle.textAlign.options"/>
        <s_radio @setValue="handleTextStyleBaselineChange" :title="fontStyle.verticalAlign.title"
                 :default_option="fontStyle.verticalAlign.default_option" :options="fontStyle.verticalAlign.options"/>
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
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        data() {
            return {
                showLegend: {
                    title: "是否显示图例",
                    default_option: true,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"},
                    ]
                },
                legendMode: {
                    title: "图例模式",
                    default_option: false,
                    options: [
                        {id: 1, value: false, name: "不可选"},
                        {id: 2, value: "single", name: "单选"},
                        {id: 3, value: "multiple", name: "多选"},
                    ]
                },
                legendPosition_x: {
                    title: "水平安放位置",
                    default_option: "left",
                    options: [
                        {id: 1, value: "left", name: "居左"},
                        {id: 2, value: "center", name: "居中"},
                        {id: 3, value: "right", name: "居右"},
                    ]
                },
                legendPosition_y: {
                    title: "垂直安放位置",
                    default_option: "left",
                    options: [
                        {id: 1, value: "top", name: "居上"},
                        {id: 2, value: "center", name: "居中"},
                        {id: 3, value: "bottom", name: "居下"},
                    ]
                },
                legendOrigin: {
                    title: "水平放置还是垂直放置",
                    default_option: "left",
                    options: [
                        {id: 1, value: "horizontal", name: "水平"},
                        {id: 2, value: "vertical", name: "垂直"},
                    ]
                },
                legendOutlook: {
                    bgColor: {
                        title: "图例背景颜色",
                        defaultColor: "#f0000"
                    },
                    borderWidth: {
                        title: "图例边框线宽",
                        max: 30,
                        default: 0,
                        unit: "px"
                    },
                    borderColor: {
                        title: "图例边框颜色",
                        defaultColor: "#f0000"
                    },
                    padding: {
                        title: "图例内边距",
                        max: 10,
                        default: 0,
                        unit: "px"
                    },
                    width: {
                        title: "图例项宽度",
                        max: 50,
                        default: 20,
                        unit: "px"
                    },
                    height: {
                        title: "图例项高度",
                        max: 50,
                        default: 15,
                        unit: "px"
                    },
                    itemGap: {
                        title: "图例各项之间间隔",
                        max: 50,
                        default: 10,
                        unit: "px"
                    }


                },
                fontStyle: {
                    textColor: {
                        title: '文本顔色',
                        defaultColor: "#000000"
                    },
                    fontSize: {
                        title: "字体大小",
                        max: 100,
                        default: 18,
                        unit: "px"
                    },
                    fontStyle: {
                        title: "字体样式",
                        default_option: 'normal',
                        options: [
                            {id: 1, value: 'normal', name: "普通"},
                            {id: 2, value: 'italic', name: "倾斜"},
                        ]
                    },
                    fontWeight: {
                        title: "字体粗细",
                        default_option: 'normal',
                        options: [
                            {id: 1, value: 'normal', name: "普通"},
                            {id: 2, value: 'bold', name: "粗体"},
                            {id: 3, value: 'bolder', name: "更粗"},
                            {id: 4, value: 'lighter', name: "更细"}
                        ]
                    },
                    textAlign: {
                        title: "文本水平对齐方式",
                        default_option: 'left',
                        options: [
                            {id: 1, value: 'left', name: "居左"},
                            {id: 2, value: 'center', name: "居中"},
                            {id: 3, value: 'right', name: "居右"},

                        ]
                    },
                    verticalAlign: {
                        title: "文本垂直对齐方式",
                        default_option: 'top',
                        options: [
                            {id: 1, value: 'top', name: "居上"},
                            {id: 2, value: 'middle', name: "居中"},
                            {id: 3, value: 'bottom', name: "居下"},

                        ]
                    }

                }

            }
        },
        components: {
            s_checkbox,
            s_slider,
            s_radio,
            s_colorPicker

        },
        created() {
        this.initData();
            },
        methods: {
            initData(){
                this.showLegend.default_option=this.chartData.legend.show;
                this.legendMode.default_option=this.chartData.legend.selectedMode;
                this.legendPosition_x.default_option=this.chartData.legend.x;
                this.legendPosition_y.default_option=this.chartData.legend.y;
                this.legendOrigin.default_option=this.chartData.legend.orient;
                this.legendOutlook.bgColor.defaultColor=this.chartData.legend.backgroundColor;
                this.legendOutlook.borderWidth.default=this.chartData.legend.borderWidth;
                this.legendOutlook.borderColor.defaultColor=this.chartData.legend.borderColor;
                this.legendOutlook.padding.default=this.chartData.legend.padding;
                this.legendOutlook.width.default=this.chartData.legend.itemWidth;
                this.legendOutlook.height.default=this.chartData.legend.itemHeight;
                this.legendOutlook.itemGap.default=this.chartData.legend.itemGap;
                this.fontStyle.textColor.defaultColor=this.chartData.legend.textStyle.color;
                this.fontStyle.fontSize.default=this.chartData.legend.textStyle.fontSize;
                this.fontStyle.fontStyle.default_option=this.chartData.legend.textStyle.fontStyle;
                this.fontStyle.fontWeight.default_option=this.chartData.legend.textStyle.fontWeight;
                this.fontStyle.textAlign.default_option=this.chartData.legend.textStyle.align;
                this.fontStyle.verticalAlign.default_option=this.chartData.legend.textStyle.baseline;

            },
            mergeProp(propName, val) {
                let copyObject = this.chartData;
                if (copyObject.legend == undefined) {
                    Vue.set(copyObject, 'legend', {})
                    Vue.set(copyObject.legend, 'textStyle', {})
                }
                Vue.set(copyObject.legend, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergePropDeep(propName, val) {
                let copyObject = this.chartData;
                if (copyObject.legend == undefined) {
                    Vue.set(copyObject, 'legend', {})
                    Vue.set(copyObject.legend, 'textStyle', {})
                }else {
                    if(copyObject.legend.textStyle==undefined){
                        Vue.set(copyObject.legend, 'textStyle', {})
                    }
                }
                Vue.set(copyObject.legend.textStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleLegendShowChange(val) {
                this.mergeProp("show", val)
            },
            handleLegendSelectedModeChange(val) {
                this.mergeProp("selectedMode", val)
            },
            handleLegendXChange(val) {
                this.mergeProp("x", val)
            },
            handleLegendYChange(val) {
                this.mergeProp("y", val)
            },
            handleLegendOrientChange(val) {
                this.mergeProp("orient", val)
            },
            handleLegendBackgroundColorChange(val) {
                this.mergeProp("backgroundColor", val)
            },
            handleLegendBorderWidthChange(val) {
                this.mergeProp("borderWidth", val)
            },
            handleLegendBorderColorChange(val) {
                this.mergeProp("borderColor", val)
            },
            handleLegendPaddingChange(val) {
                this.mergeProp("padding", val)
            },
            handleLegendItemWidthChange(val) {
                this.mergeProp("itemWidth", val)
            },
            handleLegendItemHeightChange(val) {
                this.mergeProp("itemHeight", val)
            },
            handleLegendItemGapChange(val) {
                this.mergeProp("itemGap", val)
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