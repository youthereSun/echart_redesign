<template>
    <div class="padding_10">
        <s_radio @setValue="handleAxisLabelShowChange" :title="showAxisLabel.title"
                 :default_option="showAxisLabel.default_option"
                 :options="showAxisLabel.options"/>
        <s_slider @setValue="handleAxisLabelIntervalChange" :title="labelInterval.title"
                  :default_value="labelInterval.default" :max="labelInterval.max"
                  :unit="labelInterval.unit"/>
        <s_slider @setValue="handleAxisLabelRotateChange" :title="rotateAngle.title"
                  :default_value="rotateAngle.default" :max="rotateAngle.max" :min="rotateAngle.min"
                  :unit="rotateAngle.unit"/>
        <s_slider @setValue="handleAxisLabelMarginChange" :title="label_axis_margin.title"
                  :default_value="label_axis_margin.default" :max="label_axis_margin.max"
                  :unit="label_axis_margin.unit"/>
        <s_input @setValue="handleAxisLabelFormatterChange" :title="diyLabel.title"
                 :default_field="diyLabel.default_field"/>
        <p class="setting_group_name">坐标轴文本标签文本样式</p>
        <s_colorPicker
                @setValue="handleAxisLabelStyleColorChange"
                :title="textColor.title"
                :default_color="textColor.defaultColor"
        />
        <s_slider
                @setValue="handleAxisLabelStyleFontsizeChange"
                :title="fontSize.title"
                :max="fontSize.max"
                :default_value="fontSize.default"
                :unit="fontSize.unit"
        />
        <s_radio @setValue="handleAxisLabelStyleFontStyleChange" :title="fontStyle.title"
                 :default_option="fontStyle.default_option" :options="fontStyle.options"/>
        <s_radio @setValue="handleAxisLabelStyleAlignChange" :title="textAlign.title"
                 :default_option="textAlign.default_option" :options="textAlign.options"/>
        <s_radio @setValue="handleAxisLabelStyleFontWeightChange" :title="fontWeight.title"
                 :default_option="fontWeight.default_option" :options="fontWeight.options"/>
        <s_radio @setValue="handleAxisLabelStyleBaselineChange" :title="verticalAlign.title"
                 :default_option="verticalAlign.default_option" :options="verticalAlign.options"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_radio from "../../original_components/s_radio";
    import s_colorPicker from "../../original_components/s_colorPicker";
    import s_slider from "../../original_components/s_slider";
    import s_input from "../../original_components/s_input";

    export default {
        name: "tag_line",
        data() {
            return {
                showAxisLabel: {
                    title: "坐标轴标签是否显示",
                    default_option: true,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"}
                    ]
                },
                labelInterval: {
                    title: "坐标轴标签显示间隔",
                    max: 100,
                    default: 0,
                    unit: ""
                },
                rotateAngle: {
                    title: "坐标轴标签旋转角度",
                    max: 180,
                    min: -180,
                    default: 0,
                    unit: "°"
                },
                label_axis_margin: {
                    title: "坐标轴与标签的间距",
                    max: 50,
                    default: 8,
                    unit: "px"
                },
                diyLabel: {
                    title: "坐标轴标签内容模板",
                    default_field: "{value}"
                },
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
        },
        components: {
            s_slider,
            s_radio,
            s_colorPicker,
            s_input

        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        props: {
            axis: {
                type: String,
                required: false,
                default: "xAxis"
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
        methods: {
            initData() {
                this.showAxisLabel.default_option=this.chartData[this.axis][this.id].axisLabel.show;
                this.labelInterval.default=this.chartData[this.axis][this.id].axisLabel.interval;
                this.rotateAngle.default=this.chartData[this.axis][this.id].axisLabel.rotate;
                this.label_axis_margin.default=this.chartData[this.axis][this.id].axisLabel.margin;
                this.diyLabel.default_field=this.chartData[this.axis][this.id].axisLabel.formatter;

                this.textColor.defaultColor=this.chartData[this.axis][this.id].axisLabel.textStyle.color;
                this.fontSize.default=this.chartData[this.axis][this.id].axisLabel.textStyle.fontSize;
                this.fontStyle.default_option=this.chartData[this.axis][this.id].axisLabel.textStyle.fontStyle;
                this.fontWeight.default_option=this.chartData[this.axis][this.id].axisLabel.textStyle.fontWeight;
                this.textAlign.default_option=this.chartData[this.axis][this.id].axisLabel.textStyle.align;
                this.verticalAlign.default_option=this.chartData[this.axis][this.id].axisLabel.textStyle.baseline;

            },
            mergeProp(propName, val) {
                let copyObject = this.chartData;
                if (copyObject[this.axis][this.id].axisLabel == undefined) {
                    Vue.set(copyObject[this.axis][this.id], "axisLabel", {})
                    Vue.set(copyObject[this.axis][this.id].axisLabel, "textStyle", {})
                }
                Vue.set(copyObject[this.axis][this.id].axisLabel, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergePropDeep(propName, val) {
                let copyObject = this.chartData;
                if (copyObject[this.axis][this.id].axisLabel == undefined) {
                    Vue.set(copyObject[this.axis][this.id], "axisLabel", {})
                    Vue.set(copyObject[this.axis][this.id].axisLabel, "textStyle", {})
                }
                Vue.set(copyObject[this.axis][this.id].axisLabel.textStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleAxisLabelShowChange(val) {
                this.mergeProp("show", val)
            },
            handleAxisLabelIntervalChange(val) {
                this.mergeProp("interval", val)
            },
            handleAxisLabelRotateChange(val) {
                this.mergeProp("rotate", val)
            },
            handleAxisLabelMarginChange(val) {
                this.mergeProp("margin", val)
            },
            handleAxisLabelFormatterChange(val) {
                this.mergeProp("formatter", val)
            },
            handleAxisLabelStyleColorChange(val) {
                this.mergePropDeep("color", val)
            },
            handleAxisLabelStyleFontsizeChange(val) {
                this.mergePropDeep("fontSize", val)
            },
            handleAxisLabelStyleFontStyleChange(val) {
                this.mergePropDeep("fontStyle", val)
            },
            handleAxisLabelStyleAlignChange(val) {
                this.mergePropDeep("align", val)
            },
            handleAxisLabelStyleBaselineChange(val) {
                this.mergePropDeep("baseline", val)
            },
            handleAxisLabelStyleFontWeightChange(val) {
                this.mergePropDeep("fontWeight", val)
            }

        }

    }
</script>

<style scoped>

</style>