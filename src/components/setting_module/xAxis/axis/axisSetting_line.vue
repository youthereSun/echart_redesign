<template>
    <div class="padding_10">
        <s_radio @setValue="handleShowAxisLineChange" :title="showAxis.title" :default_option="showAxis.default_option"
                 :options="showAxis.options"></s_radio>
        <p class="setting_group_name">是否线条特定样式设置</p>
        <s_color-picker @setValue="handleAxisLineColorChange" :title="axisColor.title"
                        :default_color="axisColor.defaultColor"/>
        <s_slider @setValue="handleAxisLineWidthChange" :title="axisWidth.title" :max="axisWidth.max"
                  :default_value="axisWidth.default" :unit="axisWidth.unit"/>
        <s_radio @setValue="handleAxisLineTypeChange" :title="lineType.title" :default_option="lineType.default_option"
                 :options="lineType.options"></s_radio>

    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_radio from "../../original_components/s_radio";
    import s_colorPicker from "../../original_components/s_colorPicker";
    import s_slider from "../../original_components/s_slider";

    export default {
        name: "axisSetting_line",
        data() {
            return {
                showAxis: {
                    title: "轴线是否显示",
                    default_option: false,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"}
                    ]
                },
                axisColor: {
                    title: "线条颜色",
                    defaultColor: "#fffff"

                },
                axisWidth: {
                    title: "线条宽度",
                    max: 20,
                    default: 2,
                    unit: "px"

                },
                lineType: {
                    title: "线条类型",
                    default_option: "solid",
                    options: [
                        {id: 1, value: "solid", name: "实线"},
                        {id: 2, value: "dotted", name: "点状线"},
                        {id: 3, value: "dashed", name: "虚线"},
                    ]
                },

            }
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
        components: {
            s_radio,
            s_colorPicker,
            s_slider
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.showAxis.default_option=this.chartData[this.axis][this.id].axisLine.show;
                this.axisColor.defaultColor=this.chartData[this.axis][this.id].axisLine.lineStyle.color;
                this.axisWidth.default=this.chartData[this.axis][this.id].axisLine.lineStyle.width;
                this.lineType.default_option=this.chartData[this.axis][this.id].axisLine.lineStyle.type;
            },
            mergeProps(propName, val) {
                let copyObject = this.chartData;
                if (copyObject[this.axis][this.id].axisLine == undefined) {
                    Vue.set(copyObject[this.axis][this.id], "axisLine", {})
                }
                Vue.set(copyObject[this.axis][this.id].axisLine, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergePropsDeep(propName, val) {
                let copyObject = this.chartData;
                if (copyObject[this.axis][this.id].axisLine.lineStyle == undefined) {
                    Vue.set(copyObject[this.axis][this.id], "axisLine", {})
                    Vue.set(copyObject[this.axis][this.id].axisLine, "lineStyle", {})
                }
                Vue.set(copyObject[this.axis][this.id].axisLine.lineStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleShowAxisLineChange(val) {
                this.mergeProps("show", val)
            },
            handleAxisLineColorChange(val) {
                this.mergePropsDeep("color", val)
            },
            handleAxisLineWidthChange(val) {
                this.mergePropsDeep("width", val)
            },
            handleAxisLineTypeChange(val) {
                this.mergePropsDeep("type", val)
            }

        }
    }
</script>

<style scoped>

</style>