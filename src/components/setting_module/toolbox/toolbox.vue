<template>
    <div class="padding_10">
        <s_radio @setValue="handleToolboxShowChange"  :title="showToolBox.title" :default_option="showToolBox.default_option" :options="showToolBox.options"/>
        <p class="setting_group_name">工具箱位置</p>
        <s_radio @setValue="handleToolboxXChange" :title="toolsPosition.position_x.title" :default_option="toolsPosition.position_x.default_option" :options="toolsPosition.position_x.options"/>
        <s_radio @setValue="handleToolboxYChange" :title="toolsPosition.position_y.title" :default_option="toolsPosition.position_y.default_option" :options="toolsPosition.position_y.options"/>
        <s_radio @setValue="handleToolboxOrientChange" :title="toolsPosition.origin.title" :default_option="toolsPosition.origin.default_option" :options="toolsPosition.origin.options"/>
        <p class="setting_group_name">功能按钮设定</p>
        <s_radio  :title="toolButton.mark.title" :default_option="toolButton.mark.default_option" :options="toolButton.mark.options"/>
        <s_radio :title="toolButton.dataZoom.title" :default_option="toolButton.dataZoom.default_option" :options="toolButton.dataZoom.options"/>
        <s_radio :title="toolButton.dataView.title" :default_option="toolButton.dataView.default_option" :options="toolButton.dataView.options"/>
        <s_radio :title="toolButton.restore.title" :default_option="toolButton.restore.default_option" :options="toolButton.restore.options"/>
        <s_radio :title="toolButton.saveAsImage.title" :default_option="toolButton.saveAsImage.default_option" :options="toolButton.saveAsImage.options"/>
        <p class="setting_group_name">工具箱外观</p>
        <s_color-picker @setValue="handleToolboxBGColorChange" :title="outLook.bgColor.title" :default_color="outLook.bgColor.defaultColor"  />
        <s_slider @setValue="handleToolboxBorderWidthChange" :title="outLook.borderWidth.title" :default_value="outLook.borderWidth.default" :max="outLook.borderWidth.max" :unit="outLook.borderWidth.unit"/>
        <s_color-picker @setValue="handleToolboxBorderColorChange"  :title="outLook.borderColor.title" :default_color="outLook.borderColor.defaultColor"  />
        <s_slider  @setValue="handleToolboxPaddingChange" :title="outLook.padding.title" :default_value="outLook.padding.default" :max="outLook.padding.max" :unit="outLook.padding.unit"/>
        <s_slider  @setValue="handleToolboxItemSizeChange" :title="outLook.itemSize.title" :default_value="outLook.itemSize.default" :max="outLook.itemSize.max" :unit="outLook.itemSize.unit"/>
        <s_slider   @setValue="handleToolboxItemGapChange" :title="outLook.itemGap.title" :default_value="outLook.itemGap.default" :max="outLook.itemGap.max" :unit="outLook.itemGap.unit"/>
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
        name: "toolbox",
        components:{
            s_checkbox,
            s_slider,
            s_radio,
            s_colorPicker

        },
        computed: {
            ...mapState({
                chartData: state => state.chartList[state.currentChartId],
            })
        },
        data(){
            return{
                showToolBox:{
                    title:"是否显示工具箱",
                    default_option: true,
                    options: [
                        {id: 1, value: true, name: "是"},
                        {id: 2, value: false, name: "否"},
                    ]
                },
                toolsPosition:{
                    position_x: {
                        title: "水平安放位置",
                        default_option: "right",
                        options: [
                            {id: 1, value: "left", name: "居左"},
                            {id: 2, value: "center", name: "居中"},
                            {id: 3, value: "right", name: "居右"},
                        ]
                    },
                    position_y: {
                        title: "垂直安放位置",
                        default_option: "top",
                        options: [
                            {id: 1, value: "top", name: "居上"},
                            {id: 2, value: "center", name: "居中"},
                            {id: 3, value: "bottom", name: "居下"},
                        ]
                    },
                    origin: {
                        title: "水平放置还是垂直放置",
                        default_option: "horizontal",
                        options: [
                            {id: 1, value: "horizontal", name: "水平"},
                            {id: 2, value: "vertical", name: "垂直"},
                        ]
                    },
                },
                toolButton:{
                    mark:{
                        title:"绘制辅助线功能按钮",
                        default_option: true,
                        options: [
                            {id: 1, value: true, name: "是"},
                            {id: 2, value: false, name: "否"},
                        ]
                    },
                    dataZoom:{
                        title:"选区缩放功能按钮",
                        default_option: true,
                        options: [
                            {id: 1, value: true, name: "是"},
                            {id: 2, value: false, name: "否"},
                        ]
                    },
                    dataView:{
                        title:"切换至数据视图按钮",
                        default_option: true,
                        options: [
                            {id: 1, value: true, name: "是"},
                            {id: 2, value: false, name: "否"},
                        ]
                    },
                    restore:{
                        title:"还原按钮",
                        default_option: true,
                        options: [
                            {id: 1, value: true, name: "是"},
                            {id: 2, value: false, name: "否"},
                        ]
                    },
                    saveAsImage:{
                        title:"保存为图片按钮",
                        default_option: true,
                        options: [
                            {id: 1, value: true, name: "是"},
                            {id: 2, value: false, name: "否"},
                        ]
                    }
                },
                outLook:{
                    bgColor:{
                        title:'工具箱背景颜色',
                        defaultColor:"#000000"
                    },
                    borderWidth:{
                        title: "工具箱边框线宽",
                        max:10,
                        default:0,
                        unit:"px"
                    },
                    borderColor:{
                        title:'工具箱边框颜色',
                        defaultColor:"#000000"
                    },
                    padding:{
                        title: "工具箱内边距",
                        max:10,
                        default:0,
                        unit:"px"
                    },
                    itemSize:{
                        title: "工具箱每项的大小",
                        max:50,
                        default:20,
                        unit:"px"
                    },
                    itemGap:{
                        title: "工具箱各项之间间隔",
                        max:50,
                        default:20,
                        unit:"px"
                    }
                }

            }
        },
        methods:{
            mergeProp(propName,val){
                let copyObject = this.chartData;
                if (copyObject.toolbox == undefined) {
                    Vue.set(copyObject, 'toolbox', {})
                   // Vue.set(copyObject.tooltip, 'textStyle', {})
                }
                Vue.set(copyObject.toolbox, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            mergePropDeep(propName, val) {
                let copyObject = this.chartData;
                if (copyObject.toolbox == undefined) {
                    Vue.set(copyObject, 'toolbox', {})
                    Vue.set(copyObject.tooltip, 'textStyle', {})
                }else {
                    if(copyObject.tooltip.textStyle==undefined){
                        Vue.set(copyObject.tooltip, 'textStyle', {})
                    }
                }
                Vue.set(copyObject.tooltip.textStyle, propName, val.new_value)
                this.$store.commit("setChartData", copyObject)
            },
            handleToolboxShowChange(val){
                this.mergeProp("show",val)
            },
            handleToolboxXChange(val){
                this.mergeProp("x",val)
            },
            handleToolboxYChange(val){
                this.mergeProp("y",val)
            },
            handleToolboxOrientChange(val){
                this.mergeProp("orient",val)
            },
            handleToolboxBGColorChange(val){
                this.mergeProp("backgroundColor",val)
            },
            handleToolboxBorderWidthChange(val){
                this.mergeProp("borderWidth",val)
            },
            handleToolboxBorderColorChange(val){
                this.mergeProp("borderColor",val)
            },
            handleToolboxPaddingChange(val){
                this.mergeProp("padding",val)
            },
            handleToolboxItemSizeChange(val){
                this.mergeProp("itemSize",val)
            },
            handleToolboxItemGapChange(val){
                this.mergeProp("itemGap",val)
            }

        }
    }
</script>

<style scoped>

</style>