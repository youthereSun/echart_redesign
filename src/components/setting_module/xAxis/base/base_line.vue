<template>
    <div class="padding_10">
        <s_radio @setValue="handleAxisPositionChange" :title="position.title" :default_option="position.default_option"
                 :options="position.options"/>
        <s_input  @setValue="handleAxisNameChange"  :title="name.title" :default_field="name.default_field"/>
        <s_radio  @setValue="handleNameLocationChange" :title="name_position.title" :default_option="name_position.default_option"
                 :options="name_position.options"/>
        <p class="setting_group_name">坐标轴名称文字样式</p>
        <s_colorPicker
                @setValue="handleNameTextStyleColorChange"
                :title="textColor.title"
                :default_color="textColor.defaultColor"
        />
        <s_slider
                @setValue="handleNameTextStyleFontSizeChange"
                :title="fontSize.title"
                :max="fontSize.max"
                :default_value="fontSize.default"
                :unit="fontSize.unit"
        />
        <s_radio  @setValue="handleNameTextStyleFontStyleChange" :title="fontStyle.title" :default_option="fontStyle.default_option" :options="fontStyle.options"/>
        <s_radio  @setValue="handleNameTextStyleFontWeightChange" :title="fontWeight.title" :default_option="fontWeight.default_option" :options="fontWeight.options"/>
        <s_radio @setValue="handleNameTextStyleAlignChange" :title="textAlign.title" :default_option="textAlign.default_option" :options="textAlign.options"/>
        <s_radio @setValue="handleNameTextStyleBaselineChange" :title="verticalAlign.title" :default_option="verticalAlign.default_option"
                 :options="verticalAlign.options"/>
<!--        <p class="setting_group_name">其他</p>
        <s_radio  @setValue="handleAxisScaleChange" :title="intervalStrategy.title" :default_option="intervalStrategy.default_option"
                 :options="intervalStrategy.options"/>

        <s_input @setValue="handleAxisMinChange" type="number"  :title="min_x.title" :default_field="min_x.default_field"/>
        <s_input @setValue="handleAxisMaxChange" type="number"  :title="max_x.title" :default_field="max_x.default_field"/>
        <s_slider
                @setValue="handleSplitNumberChange"
                :title="splitNumber.title"
                :max="splitNumber.max"
                :default_value="splitNumber.default"
                :unit="splitNumber.unit"
        />-->
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
        name: "base_line",
        components: {
            s_slider,
            s_colorPicker,
            s_radio,
            s_input
        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        data() {
            return {
                position: {
                    title: "坐标轴位置",
                    default_option: "bottom",
                    options: [
                        {id: 1, value: 'top', name: "居上"},
                        {id: 2, value: 'bottom', name: "居下"},
                        {id: 3, value: 'right', name: "居右"},
                        {id: 4, value: 'left', name: "居左"},
                    ]
                },
                name: {
                    title: "坐标轴名称",
                    default_field: "",
                },
                name_position: {
                    title: "坐标轴名称位置",
                    default_option: "start",
                    options: [
                        {id: 1, value: 'start', name: "位于开端"},
                        {id: 2, value: 'end', name: "位于末端"},

                    ]
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
                },
                intervalStrategy: {
                    title: "坐标轴显示区间策略",
                    default_option: true,
                    options: [
                        {id: 1, value: true, name: "根据最大最小值自适应"},
                        {id: 2, value: false, name: "总是包含0"}

                    ]
                },
                min_x: {
                    title: "坐标轴最小值",
                    default_field: 0,
                },
                max_x: {
                    title: "坐标轴最大值",
                    default_field: 0,
                },
                splitNumber: {
                    title: "分割段数",
                    max: 300,
                    default: 10,
                    unit: "px"
                },


            }
        },
        props: {
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
        methods: {
            initData(){
                this.position.default_option=this.chartData[this.axis][this.id].position;
                this.name.default_field=this.chartData[this.axis][this.id].name;
                this.name_position.default_option=this.chartData[this.axis][this.id].nameLocation;
                this.textColor.defaultColor=this.chartData[this.axis][this.id].nameTextStyle.color;
                this.fontSize.default=this.chartData[this.axis][this.id].nameTextStyle.fontSize;
                this.fontStyle.default_option=this.chartData[this.axis][this.id].nameTextStyle.fontStyle;
                this.fontWeight.default_option=this.chartData[this.axis][this.id].nameTextStyle.fontWeight;
                this.textAlign.default_option=this.chartData[this.axis][this.id].nameTextStyle.align;
                this.verticalAlign.default_option=this.chartData[this.axis][this.id].nameTextStyle.baseline;
          /*      this.intervalStrategy.default_option=this.chartData[this.axis][this.id].scale;
                this.min_x.default_field=this.chartData[this.axis][this.id].min;
                this.max_x.default_field=this.chartData[this.axis][this.id].max;
                this.splitNumber.default=this.chartData[this.axis][this.id].splitNumber;*/

            },
            mergeProp(propName, val) {
                let copyObject = this.chartData;
                Vue.set(copyObject[this.axis][this.id], propName, val.new_value);
                this.$store.commit("setChartData", copyObject)
            },
            mergePropStyle(propName, val) {
                let copyObject = this.chartData;
                if(copyObject[this.axis][this.id].nameTextStyle==undefined){
                    Vue.set(copyObject[this.axis][this.id], "nameTextStyle", {});
                }
                Vue.set(copyObject[this.axis][this.id].nameTextStyle,propName , val.new_value);
                this.$store.commit("setChartData", copyObject)
            },
            handleAxisPositionChange(val) {
                this.mergeProp("position",val)
            },
            handleAxisNameChange(val){
                this.mergeProp("name",val)
            },
            handleNameLocationChange(val){
                this.mergeProp("nameLocation",val)
            },
            handleNameTextStyleColorChange(val){
                this.mergePropStyle("color",val)
            },
            handleNameTextStyleFontSizeChange(val){
                this.mergePropStyle("fontSize",val)
            },
            handleNameTextStyleFontStyleChange(val){
                this.mergePropStyle("fontStyle",val)
            },
            handleNameTextStyleAlignChange(val){
                this.mergePropStyle("align",val)
            },
            handleNameTextStyleBaselineChange(val){
                this.mergePropStyle("baseline",val)
            },
            handleNameTextStyleFontWeightChange(val){
                this.mergePropStyle("fontWeight",val)
            },
            handleAxisScaleChange(val){
                this.mergeProp("scale",val)
            },
            handleAxisMinChange(val){
                this.mergeProp("min",val)
            },
            handleAxisMaxChange(val){
                this.mergeProp("max",val)
            },
            handleSplitNumberChange(val){
                this.mergeProp("splitNumber",val)
            }

        }
    }
</script>

<style scoped>

</style>