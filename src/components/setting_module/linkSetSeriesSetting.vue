<template>
    <div id="linkSetSeriesSetting" class="padding_10">
        <s_input title="系列名" :default_field="name" @setValue="handleSeriesNameChange"   />
        <s_radio  v-if="typeOfChart!='scatter'" @setValue="handleSeriesTypeChange" :title="seriesType.title"
                 :default_option="seriesType.default_option" :options="seriesType.options"/>
        <s_radio v-if="typeOfChart!='scatter'" v-show="isMultipleX" @setValue="handleXChoiceChange" :title="x_choice.title" :default_option="x_choice.default_option"
                 :options="x_choice.options"/>
        <s_radio v-if="typeOfChart!='scatter'"  v-show="isMultipleY" @setValue="handleYChoiceChange" :title="y_choice.title" :default_option="y_choice.default_option"
                 :options="y_choice.options"/>
        <s_colorPicker v-if="typeOfChart!='scatter'" @setValue="handleLineColorChange"
                       :title="lineColor.title"
                       :default_color="lineColor.defaultColor"/>
        <s_slider v-if="typeOfChart!='scatter'" @setValue="handleLineWidthChange"
                  :title="lineWidth.title"
                  :max="lineWidth.max"
                  :default_value="lineWidth.default"
                  :unit="lineWidth.unit"
        />
        <s_radio v-if="typeOfChart!='scatter'" @setValue="handleLineTypeChange" :title="lineType.title" :default_option="lineType.default_option"
                 :options="lineType.options"/>
        <s_slider v-if="typeOfChart!='scatter'" @setValue="handleBarWidthChange"
                  :title="barWidth.title"
                  :max="barWidth.max"
                  :default_value="barWidth.default"
                  :unit="barWidth.unit"
        />
        <s_colorPicker v-if="typeOfChart!='scatter'" @setValue="handleBarColorChange"
                       :title="barColor.title"
                       :default_color="barColor.defaultColor"/>
        <s_colorPicker v-if="typeOfChart!='scatter'" @setValue="handleShadowColorChange"
                       :title="lineShadow.title"
                       :default_color="lineShadow.defaultColor"/>
        <s_slider v-if="typeOfChart!='scatter'" @setValue="handleShadowBlurChange"
                  :title="lineShadow_mohu.title"
                  :max="lineShadow_mohu.max"
                  :default_value="lineShadow_mohu.default"
                  :unit="lineShadow_mohu.unit"
        />
        <s_slider v-if="typeOfChart!='scatter'" @setValue="handleShadowOffsetXChange"
                  :title="shadow_x.title"
                  :max="shadow_x.max"
                  :min="shadow_x.min"
                  :default_value="shadow_x.default"
                  :unit="shadow_x.unit"
        />
        <s_slider v-if="typeOfChart!='scatter'" @setValue="handleShadowOffsetYChange"
                  :title="shadow_y.title"
                  :max="shadow_y.max"
                  :min="shadow_y.min"
                  :default_value="shadow_y.default"
                  :unit="shadow_y.unit"
        />
        <p class="setting_group_name">
            小标志设置
        </p>
        <s_radio :show-border="true" @setValue="handleSymbolChange" :title="logoShape.title"
                 :default_option="logoShape.default_option" :options="logoShape.options"/>
        <s_slider @setValue="handleSymbolSizeChange"
                  :title="logoSize.title"
                  :max="logoSize.max"
                  :default_value="logoSize.default"
                  :unit="logoSize.unit"
        />
        <s_slider @setValue="handleSymbolRotateChange"
                  :title="logoRotate.title"
                  :max="logoRotate.max"
                  :min="logoRotate.min"
                  :default_value="logoRotate.default"
                  :unit="logoRotate.unit"
        />
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_radio from "./original_components/s_radio";
    import s_colorPicker from "./original_components/s_colorPicker";
    import s_slider from "./original_components/s_slider";
    import s_input from "./original_components/s_input";

    export default {
        name: "linkSetSeriesSetting",
        components: {
            s_slider,
            s_radio,
            s_colorPicker,
            s_input
        },
        data() {
            return {
                isMultipleX:false,
                isMultipleY:false,
                seriesType: {
                    title: "系列的图形类型",
                    default_option: "line",
                    options: [
                        {id: 1, value: "line", name: "折线"},
                        {id: 2, value: "bar", name: "柱"},
                    ]
                },
                x_choice: {
                    title: "多x轴时使用：",
                    default_option: 0,
                    options: [
                        {id: 1, value: 0, name: "轴A"},
                        {id: 2, value: 1, name: "轴B"},
                    ]
                },
                y_choice: {
                    title: "多y轴时使用：",
                    default_option: 0,
                    options: [
                        {id: 1, value: 0, name: "轴A"},
                        {id: 2, value: 1, name: "轴B"},
                    ]
                },
                lineColor: {
                    title: "线条颜色",
                    defaultColor: "f0000"
                },
                lineWidth: {
                    title: "线条宽度",
                    max: 20,
                    default: 4,
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
                lineShadow: {
                    title: "光影颜色",
                    defaultColor: "f0000"
                },
                barColor: {
                    title: "柱色",
                    defaultColor: ""
                },

                lineShadow_mohu: {
                    title: "光影模糊度",
                    max: 20,
                    default: 4,
                    unit: "px"
                },
                shadow_x: {
                    title: "光影横向偏移 ",
                    max: 50,
                    min: -50,
                    default: 0,
                    unit: "px"
                },
                shadow_y: {
                    title: "光影纵向偏移 ",
                    max: 50,
                    min: -50,
                    default: 0,
                    unit: "px"
                },
                logoShape: {
                    title: "小标志图形",
                    default_option: "circle",
                    options: [
                        {id: 1, value: "roundRect", name: "弧角矩形"},
                        {id: 3, value: "pin", name: "标注"},
                        {id: 4, value: "arrow", name: "箭头"},
                        {id: 6, value: "diamond", name: "棱形"},
                        {id: 7, value: "circle", name: "圆"},
                        {id: 8, value: "rectangle", name: "矩形"},
                        {id: 9, value: "triangle", name: "三角形"},
                        {id: 10, value: "emptyCircle", name: "空心圆"},
                        {id: 11, value: "emptyRectangle", name: "空心矩形"},
                        {id: 12, value: "emptyTriangle", name: "空心三角"},
                        {id: 13, value: "emptyDiamond", name: "空心棱形"}
                    ]
                },
                logoSize: {
                    title: "小标志大小 ",
                    max: 50,
                    default: 2,
                    unit: "px"
                },
                barWidth: {
                    title: "柱宽 ",
                    max: 50,
                    default: 20,
                    unit: "px"
                },
                logoRotate: {
                    title: "小标志旋转角度 ",
                    min: -180,
                    max: 180,
                    default: 2,
                    unit: "°"
                },
            }
        },
        props: {
            index: {
                type: Number,
                required: true
            },
                typeOfChart:{
                    type:String,
                    default:"",
                    required:false
                },
            name:{
                type:String
            }
        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.chartData.xAxis.length==1?this.isMultipleX=false:this.isMultipleX=true
                this.chartData.yAxis.length==1?this.isMultipleX=false:this.isMultipleX=true
                if(this.typeOfChart!="scatter"){
                    this.barWidth.default = this.chartData.series[this.index - 1].barWidth;
                    this.seriesType.default_option = this.chartData.series[this.index - 1].type
                    this.x_choice.default_option = this.chartData.series[this.index - 1].xAxisIndex
                    this.y_choice.default_option = this.chartData.series[this.index - 1].yAxisIndex
                    this.lineColor.defaultColor = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.color;
                    this.lineWidth.default = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.width;
                    this.lineType.default_option = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.type;
                    this.lineShadow_mohu.default = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.shadowBlur;
                    this.lineShadow.defaultColor = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.shadowColor;
                    this.shadow_x.default = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.shadowOffsetX;
                    this.shadow_y.default = this.chartData.series[this.index - 1].itemStyle.normal.lineStyle.shadowOffsetY;
                    this.barColor.defaultColor=this.chartData.series[this.index - 1].itemStyle.normal.color;
                }

                this.logoShape.default_option = this.chartData.series[this.index - 1].symbol;
                this.logoSize.default = this.chartData.series[this.index - 1].symbolSize;
                this.logoRotate.default = this.chartData.series[this.index - 1].symbolRotate;

            },
            handleSeriesTypeChange(val) {
                let copyObject = this.chartData;
                copyObject.series[this.index - 1].type = val.new_value;
                this.$store.commit("setChartData", copyObject)
            },
            handleXChoiceChange(val) {
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'xAxisIndex', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleYChoiceChange(val) {
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'yAxisIndex', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleLineColorChange(val) {
                this.mergeProps("color", val);

            },
            handleSeriesNameChange(val){
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], "name", val.new_value)
                Vue.set(copyObject.legend.data, [this.index - 1], val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleLineWidthChange(val) {
                this.mergeProps("width", val);
            },
            handleLineTypeChange(val) {
                this.mergeProps("type", val);
            },
            handleBarWidthChange(val){
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'barWidth', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleShadowColorChange(val) {
                this.mergeProps("shadowColor", val);
            },
            handleBarColorChange(val){
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1].itemStyle.normal, 'color', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleShadowBlurChange(val) {
                this.mergeProps("shadowBlur", val);
            },
            handleShadowOffsetXChange(val) {
                this.mergeProps("shadowOffsetX", val);
            },
            handleShadowOffsetYChange(val) {
                this.mergeProps("shadowOffsetY", val);
            },
            handleSymbolChange(val) {
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'symbol', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleSymbolSizeChange(val) {
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'symbolSize', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleSymbolRotateChange(val) {
                let copyObject = this.chartData;
                Vue.set(copyObject.series[this.index - 1], 'symbolRotate', val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergeProps(propName, val) {
                let copyObject = this.chartData;
                if (copyObject.series[this.index - 1].itemStyle == undefined) {//没有改设置项
                    Vue.set(copyObject.series[this.index - 1], 'itemStyle', {})
                    Vue.set(copyObject.series[this.index - 1].itemStyle, 'normal', {})
                    Vue.set(copyObject.series[this.index - 1].itemStyle.normal, 'lineStyle', {})
                }
                Vue.set(copyObject.series[this.index - 1].itemStyle.normal.lineStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            }
        }
    }
</script>

<style scoped>

</style>