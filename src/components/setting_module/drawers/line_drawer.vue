<template>
    <div id="drawer">
        <el-drawer
                :close-on-press-escape=drawerOption.pressOnEsc
                :modal=drawerOption.modal
                :direction=drawerOption.direction
                :visible=show
                :show-close=drawerOption.showClose
                :withHeader=drawerOption.withHeader
                :destroy-on-close=true
        >
            <div class="settings_title">

                <span class="settings_title_text">参数调整</span>
                <el-button class="button_closeDrawer" type="primary" @click="closeDrawer"
                           size="mini">关闭
                </el-button>
            </div>
            <div class="tabs_container">

                <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                    <el-tab-pane label="基础">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="通用">
                                <vue-scroll :ops="vueScrollOption">
                                    <link-set-pane-common :typeOfChart="typeOfChart" />
                                </vue-scroll>

                            </el-tab-pane>
                            <el-tab-pane label="高级">
                                <vue-scroll :ops="vueScrollOption">
                                    <link-set-pane-advance/>
                                </vue-scroll>
                            </el-tab-pane>
                            <el-tab-pane v-for="(item,index) in seriesNames" :key="index" :label="item">
                                <vue-scroll :ops="vueScrollOption">
                                    <link-set-series-setting :name="item" :typeOfChart="typeOfChart" :index="index+1"/>
                                </vue-scroll>
                            </el-tab-pane>
                        </el-tabs>

                    </el-tab-pane>
                    <el-tab-pane label="标题">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="内容">
                                <title-setting/>
                            </el-tab-pane>
                            <el-tab-pane label="样式">
                                <vue-scroll :ops="vueScrollOption">
                                    <title-style-setting/>
                                </vue-scroll>
                            </el-tab-pane>

                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="视区">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="位置">
                                <view-port-position/>
                            </el-tab-pane>
                            <el-tab-pane label="外观">
                                <view-port-outlook/>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="x轴">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="基础">
                                <vue-scroll :ops="vueScrollOption">
                                <base_line />
                                </vue-scroll>
                            </el-tab-pane>
                            <el-tab-pane label="轴线">
                                <axis-setting_line axis="xAxis" />
                            </el-tab-pane>
                            <el-tab-pane label="标签">
                                <tag_line axis="xAxis"/>
                            </el-tab-pane>
                            <el-tab-pane label="刻度">
                                <calibration_line/>

                            </el-tab-pane>
                            <el-tab-pane label="隔线">
                                <split-line_line/>
                            </el-tab-pane>
                            <el-tab-pane label="隔区">
                                <split-area_line/>
                            </el-tab-pane>

                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane v-for="index of chartData.yAxis.length" :key="index" :label="chartData.yAxis.length==1?'y轴' :'y轴'+index">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="基础">
                                <base_line  axis="yAxis" :id="index-1"/>
                            </el-tab-pane>
                            <el-tab-pane label="轴线">
                                <axis-setting_line  axis="yAxis" :id="index-1"/>
                            </el-tab-pane>
                            <el-tab-pane label="标签">
                                <tag_line  axis="yAxis" :id="index-1"/>
                            </el-tab-pane>
                            <el-tab-pane label="刻度">
                                <calibration_line  axis="yAxis" :id="index-1"/>

                            </el-tab-pane>
                            <el-tab-pane label="隔线">
                                <split-line_line  axis="yAxis" :id="index-1"/>
                            </el-tab-pane>
                            <el-tab-pane label="隔区">
                                <split-area_line  axis="yAxis" :id="index-1"/>
                            </el-tab-pane>

                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="图例">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="基础">
                                <vue-scroll :ops="vueScrollOption">
                                    <legend-base/>
                                </vue-scroll>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="提示">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="通用">
                                <vue-scroll :ops="vueScrollOption">
                                    <tooltips-setting/>
                                </vue-scroll>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
            <!--        <el-tab-pane label="工具">
                        <el-tabs :type=tabsOption.tabType :tab-position=tabsOption.tabPosition>
                            <el-tab-pane label="基础">
                                <vue-scroll :ops="vueScrollOption">
                                    <toolbox/>
                                </vue-scroll>
                            </el-tab-pane>
                        </el-tabs>

                    </el-tab-pane>-->

                </el-tabs>

            </div>
        </el-drawer>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import linkSetPaneCommon from "../linkSetPaneCommon";
    import linkSetPaneAdvance from "../linkSetPaneAdvance";
    import linkSetSeriesSetting from "../linkSetSeriesSetting";
    import titleSetting from "../titleSetting";
    import titleStyleSetting from "../titleStyleSetting";
    import viewPortPosition from "../viewPortPosition";
    import viewPortOutlook from "../viewPortOutlook";
    import base_line from "../xAxis/base/base_line";
    import axisSetting_line from "../xAxis/axis/axisSetting_line";
    import tag_line from "../xAxis/tag/tag_line";
    import calibration_line from "../xAxis/calibration/calibration_line";
    import splitLine_line from "../xAxis/splitLine/splitLine_line";
    import splitArea_line from "../xAxis/splitArea/splitArea_line";
    import legendBase from "../legend/LegendBase";
    import tooltipsSetting from "../tooltips/tooltipsSetting";
    import toolbox from "../toolbox/toolbox";

    export default {
        name: "line_drawer",
        data() {
            let self = this;
            return {
                showDrawer: self.show,
            }
        },
        components: {
            linkSetPaneCommon,
            linkSetPaneAdvance,
            linkSetSeriesSetting,
            titleSetting,
            titleStyleSetting,
            viewPortPosition,
            viewPortOutlook,
            base_line,
            axisSetting_line,
            tag_line,
            calibration_line,
            splitLine_line,
            splitArea_line,
            legendBase,
            tooltipsSetting,
            toolbox

        },
        computed: {
            ...mapState({
                drawerOption: state => state.drawerOption,
                tabsOption: state => state.tabsOption,
                tabPaneList_line: state => state.tabPaneList_line,
                vueScrollOption: state => state.vueScrollOption,
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        props: {
            show: {
                type: Boolean,
                required: false,
                default: false
            },
            seriesLength: {
                type: Number,
                required: false,
                default: 0
            },
            seriesNames: {
                type: Array,
                required: false,
            },
            typeOfChart:{
                type:String,
                default:"",
                required:false
            }
        },
        methods: {
            closeDrawer() {
                this.$emit("close")
            }
        }
    }
</script>