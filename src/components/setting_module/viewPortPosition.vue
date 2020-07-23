<template>
    <div class="padding_10">
        <p class="setting_group_name">直角坐标系绘图区域位置（仅直角坐标系有效）</p>
        <s_slider
                @setValue="handleGridXChange"
                :title="left_x.title"
                :max="left_x.max"
                :default_value="left_x.default"
                :unit="left_x.unit"
        />
        <s_slider
                @setValue="handleGridYChange"
                :title="left_y.title"
                :max="left_y.max"
                :default_value="left_y.default"
                :unit="left_y.unit"
        />

        <s_slider
                @setValue="handleGridX2Change"
                :title="bottomRight_x.title"
                :max="bottomRight_x.max"
                :default_value="bottomRight_x.default"
                :unit="bottomRight_x.unit"
        />

        <s_slider
                @setValue="handleGridY2Change"
                :title="bottomRight_y.title"
                :max="bottomRight_y.max"
                :default_value="bottomRight_y.default"
                :unit="bottomRight_y.unit"
        />

  <!--      <s_slider
                @setValue="handleGridHeightChange"
                :title="height.title"
                :max="height.max"
                :default_value="height.default"
                :unit="height.unit"
        />

        <s_slider
                @setValue="handleGridWidthChange"
                :title="width.title"
                :max="width.max"
                :default_value="width.default"
                :unit="width.unit"
        />-->


    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Vue from 'vue'
    import s_slider from "./original_components/s_slider";

    export default {
        name: "viewPortPosition",
        data() {
            return {
                left_x: {
                    title: "左上角横坐标",
                    max: 150,
                    default: 120,
                    unit: "px"
                },
                left_y: {
                    title: "左上角纵坐标",
                    max: 100,
                    default: 50,
                    unit: "px"
                },
                bottomRight_x: {
                    title: "右下角横坐标",
                    max: 100,
                    default: 50,
                    unit: "px"
                },
                bottomRight_y: {
                    title: "右下角纵坐标",
                    max: 100,
                    default: 60,
                    unit: "px"
                },
                height: {
                    title: "高度",
                    max: 1000,
                    default: 200,
                    unit: "px"
                },
                width: {
                    title: "宽度",
                    max: 1000,
                    default: 400,
                    unit: "px"
                }


            }
        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        components: {
            s_slider
        },
        created() {
        this.initData();
            },
        methods: {
            initData(){
                this.left_x.default=this.chartData.grid.x;
                this.left_y.default=this.chartData.grid.y;
                this.bottomRight_x.default=this.chartData.grid.x2;
                this.bottomRight_y.default=this.chartData.grid.y2;
         /*       this.height.default=this.chartData.grid.height;
                this.width.default=this.chartData.grid.width;*/
            },
            mergeProps(propName, val) {
                let copyObject = this.chartData;
                if(copyObject.grid==undefined){
                    Vue.set(copyObject, "grid", {});
                    Vue.set(copyObject.grid, propName, val.new_value);
                }else {
                    Vue.set(copyObject.grid, propName, val.new_value);
                }
                this.$store.commit("setChartData", copyObject)
            },
            handleGridXChange(val) {
                this.mergeProps("x",val);
            },
            handleGridYChange(val) {
                this.mergeProps("y",val);
            },
            handleGridX2Change(val) {
                this.mergeProps("x2",val);
            },
            handleGridY2Change(val) {
                this.mergeProps("y2",val);
            },
            handleGridWidthChange(val) {
                this.mergeProps("width",val);
            },
            handleGridHeightChange(val) {
                this.mergeProps("height",val);
            }


        }
    }
</script>

<style scoped>

</style>