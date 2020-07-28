<template>
    <div id="chart">
        <el-container>

                <!--   <div @click="toChartChoose" class="headerTitle">图说</div>-->
                <el-button v-if="refreshCode && afterLoaded"  class="refreshDataButton"   @click="refreshCodeByCode"  icon="el-icon-refresh" circle></el-button>
                <el-button v-if="afterLoaded" @click="saveConfiguration" class="submitButton" type="success" icon="el-icon-check" circle></el-button>


            <el-main>
                <el-popover
                        class="changeBg"
                        placement="right"
                        trigger="click"
                        :visible-arrow=false>
                    <ul>
                        <li v-for="item in bgList" :key="item.id">
                            <img @click="switchBG(item.name)" class="bgItem" :src="item.src">
                        </li>
                    </ul>
                    <el-button class="bgChangeButton" slot="reference"><i class="iconfont icon-theme"></i></el-button>
                </el-popover>

                <el-dialog :visible.sync="dialogTableVisible" title="数据显示">
                    <json-view
                            :data="jsonData"
                            :deep=1
                            icon-style="square"
                            theme="one-dark"
                            :font-size=16
                    />
                </el-dialog>
                <line_drawer :typeOfChart="chartType" v-if="chartType=='line'||chartType=='bar'||chartType=='scatter'"
                             :key="reloadFlag" :seriesLength="seriesLength"              :seriesNames="seriesNames"
                             @close="toggleDrawer(false)"
                             :show="showLineDrawer"/>
                <pie_drawer :typeOfChart="chartType" v-if="chartType=='pie'||chartType=='map'" :key="reloadFlag+1"
                            :seriesLength="seriesLength"
                            @close="toggleDrawer(false)"
                            :show="showPieDrawer"/>
                <VueDragResize :minh="500" :minw="700" dragHandle=".dragPoint" :preventActiveBehavior="true"
                               :sticks="['tm','bm','ml','mr']" :x="positionOption.x" :y="positionOption.y"
                               :parentLimitation="true" :isActive="true" :isDraggable="true" :isResizable="true">
                    <div class="chartBg" :class="chartBG">
                        <i class="iconfont icon-move dragPoint"></i>
                        <div class="relative_position" style="padding: 20px" v-for="item in chartList" :key="item.id"
                             :ref="'chart'+item.id">
                            <i @click="showCode(item)" class="iconfont icon-json viewCodeButton"></i>
                            <i v-show="!showLineDrawer&&!showPieDrawer"
                               @click="toggleDrawer(true,item.id,item.otherSetting.chartType)"
                               class="iconfont icon-shezhi settingButton"></i>
                            <v-chart @click="getDeatails" :theme="item.otherSetting.chartTheme" :autoresize="true" :options="item"/>
                        </div>
                    </div>
                </VueDragResize>
                <!--   <VueDragResize :minh="500" :minw="700" dragHandle=".dragPoint" :preventActiveBehavior="true"
                                  :sticks="['tm','bm','ml','mr']" :x="positionOption.x" :y="positionOption.y"
                                  :parentLimitation="true" :isActive="true" :isDraggable="true" :isResizable="true">
                       <i class="iconfont icon-move dragPoint"></i>
                       <el-collapse v-model="activeName" accordion>
                           <el-collapse-item :title="item.title.text" v-for="item in chartList" :key="item.id"
                                             :name="item.id">
                               <div class="relative_position" :ref="'chart'+item.id">
                                   <i @click="showCode(item)" class="iconfont icon-json viewCodeButton"></i>
                                   <i v-show="!showLineDrawer&&!showPieDrawer"
                                      @click="toggleDrawer(true,item.id,item.otherSetting.chartType)"
                                      class="iconfont icon-shezhi settingButton"></i>
                                   <v-chart :theme="item.otherSetting.chartTheme" :autoresize="true" :options="item"/>
                               </div>
                           </el-collapse-item>
                       </el-collapse>

                   </VueDragResize>-->
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {getChartDataByCode,saveConfigration,uploadImg} from "../api/api";
    import {mapState, mapMutations} from 'vuex'
    import line_drawer from "../components/setting_module/drawers/line_drawer";
    import pie_drawer from "../components/setting_module/drawers/pie_drawer";
    import VueDragResize from "vue-drag-resize";
    import jsonView from 'vue-json-views'
    import 'echarts/theme/bee-inspired'
    import 'echarts/theme/blue'
    import 'echarts/theme/caravan'
    import 'echarts/theme/carp'
    import 'echarts/theme/forest'
    import 'echarts/theme/dark-blue'
    import 'echarts/theme/jazz'
    import 'echarts/theme/fruit'
    import 'echarts/theme/london'
    import 'echarts/theme/red'
    import 'echarts/theme/vintage'
    import 'echarts/theme/tech-blue'
    import 'echarts/theme/sakura'
    import 'echarts/theme/shine'
    import 'echarts/theme/helianthus'
    import 'echarts/theme/roma'
    import 'echarts/theme/royal'
    import 'echarts/theme/macarons'
    import 'echarts/theme/macarons2'
    import 'echarts/theme/inspired'
    import 'echarts/theme/infographic'
    import 'echarts/theme/green'
    import 'echarts/theme/dark-mushroom'
    import {formatData,base64ToFile} from "../utils/utils";
    import clone from "../utils/deepClone";

    export default {
        data() {
            return {
                id:-1,
                chartBG: "",
                reloadFlag: 0,
                dialogTableVisible: false,
                jsonData: {},
                activeName: 0,
                seriesLength: 0,
                seriesNames:[],
                chartType: "line",/*Line 折线图,Bar 柱状图（条形图）,Pie 饼图*/
                code: "",
                title: "",
                showLineDrawer: false,//是否显示line——drawer,
                showPieDrawer: false,//是否显示pie——drawer,
                currentChartId: 0,
                chartTheme: "",
                positionOption: {
                    x: 600,
                    y: 150
                },
                refreshCode:"",
                afterLoaded:false

            }
        },
        computed: {
            ...mapState({
                chartList: state => state.chartList,
                bgList: state => state.bgList,
                chartConfig_line: state => state.chartBaseConfig[0],
                chartConfig_bar: state => state.chartBaseConfig[0],
                chartConfig_pie: state => state.chartBaseConfig[1],
                chartConfig_scatter: state => state.chartBaseConfig[2],
                chartConfig_map: state => state.chartBaseConfig[3],
            })
        },
        watch: {
/*            activeName: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    this.showPieDrawer = false;
                    this.showLineDrawer = false
                }
            },*/
        },
        components: {
            line_drawer,
            VueDragResize,
            jsonView,
            pie_drawer
        },
        created() {


            let params = JSON.parse(this.$Base64.decode(this.$route.query.key))
            this.chartType = params.type;
            /*如果url路径中有id，则为重新编辑，储存的id时候需要放在params中*/
            if(params.id){
                this.id=params.id;
            }

            this.code =params.code;
            this.title = params.title;
            this. legendData = params.legendData;
            this.mode=params.mode;

            /*如果有参数有code，则为新增，用code拿数据==没有code，为编辑,取refreshCode刷新数据*/
            if(this.code){
                let params = {
                    code: this.code
                }
                this.loadData(params);
            }else {
                /*自动展开配置卡*/
                this.toggleDrawer(true,0,this.chartType)
                this. refreshCode=params.refreshCode;
                this.afterLoaded=true;
            }




        },
        mounted() {
            this.$watch(
                function () { // 第一个函数就是处理你要监听的属性，只要将其return出去就行
                    return this.$store.state.chartList[this.currentChartId].otherSetting.chartHeight;
                },
                function (val) {
                    this.$refs['chart' + this.currentChartId][0].style.height = val;
                }
            )

            this.$watch(
                function () { // 第一个函数就是处理你要监听的属性，只要将其return出去就行
                    return this.$store.state.chartList[this.currentChartId].otherSetting.chartWidth;
                },
                function (val) {
                    this.$refs['chart' + this.currentChartId][0].style.width = val;
                }
            )
            this.initChartBaseStyle();
        },
        methods: {
            ...mapMutations(["setCurrentChartId", "setChartDataIndex0", "setChartData", "toggleShowLoading"]),
            initChartBaseStyle() {
                let chartList_copy = this.chartList;
                this.chartBG = chartList_copy[0].otherSetting.backgroundClass;
                for (let i = 0; i < chartList_copy.length; i++) {
                    this.$refs['chart' + i][0].style.height = chartList_copy[i].otherSetting.chartHeight;
                    this.$refs['chart' + i][0].style.width = chartList_copy[i].otherSetting.chartWidth;
                }
            },
            toggleDrawer(status, id, type) {
                this.currentChartId == id ? console.log("不需要渲染") : this.reloadFlag++
                if (!status) {
                    this.showLineDrawer = false;
                    this.showPieDrawer = false
                    this.positionOption = {
                        x: 600,
                        y: 150
                    }
                } else {
                    this.seriesLength = this.chartList[id].series.length
                    this.seriesNames=this.chartList[id].legend.data;
                    if (type == "line" || type == "scatter"||type=="bar") {
                        this.showLineDrawer = true
                    } else if (type == "pie" || type == "map") {
                        this.showPieDrawer = true
                    }
                    this.positionOption = {
                        x: 650,
                        y: 150
                    }
                    this.setCurrentChartId(id);
                    this.currentChartId = id;
                }
            },
            showCode(item) {
                this.dialogTableVisible = true;
                this.jsonData = item;
            },
            switchBG(name) {
                let chartList_copy = this.chartList;
                this.chartBG = name;
                this.$set(chartList_copy[0].otherSetting, "backgroundClass", name);
                this.setChartData(chartList_copy[0])
            },

            createdNewChart(type,chartData) {
                let newChart = {};

                switch (type) {
                    case "line":
                        var opacity=0;
                        if(this.mode==1){/*普通折线*/
                            opacity=0
                        }else if (this.mode==2||this.mode==4) {/*面积和堆积图*/
                            opacity=1
                        }
                        var seriesConfigLine = JSON.stringify(this.chartConfig_line.series[0]);
                        newChart = JSON.parse(JSON.stringify(this.chartConfig_line));
                        newChart.xAxis[0].data =chartData.xAxisData;
                        newChart.yAxis[0].name = chartData.yAxisName;
                        newChart.series = new Array(chartData.seriesData.length)
                        for (let i = 0; i <chartData. seriesData.length; i++) {
                            let copyObj = JSON.parse(seriesConfigLine);
                            copyObj.data = chartData.seriesData[i].data;
                            copyObj.name =chartData. seriesData[i].name;
                            copyObj.itemStyle.normal.areaStyle.opacity=opacity
                            copyObj.type = "line"
                            if(this.mode==4){/*堆积图*/
                                copyObj.stack ="总量";
                            }
                            newChart.series[i] = copyObj
                        }
                        if(this.mode==3){
                            let xAxis=JSON.stringify(newChart.xAxis)
                            let yAxis=JSON.stringify(newChart.yAxis)
                            newChart.xAxis=JSON.parse(yAxis);
                            newChart.yAxis=JSON.parse(xAxis);
                        }

                        break;
                    case "bar":
                        var seriesConfigBar = JSON.stringify(this.chartConfig_bar.series[0]);
                        newChart = JSON.parse(JSON.stringify(this.chartConfig_bar));
                        newChart.xAxis[0].data =chartData.xAxisData;
                        newChart.yAxis[0].name = chartData.yAxisName;
                        newChart.series = new Array(chartData.seriesData.length)
                        for (let i = 0; i <chartData. seriesData.length; i++) {
                            let copyObj = JSON.parse(seriesConfigBar);
                            copyObj.data = chartData.seriesData[i].data;
                            copyObj.name =chartData. seriesData[i].name;
                            copyObj.type = "bar"
                            newChart.series[i] = copyObj
                        }

                        if(this.mode==1){/*默认*/
                            /*default*/
                        }else if (this.mode==2) {/*xy交换*/
                            let xAxis=JSON.stringify(newChart.xAxis)
                            let yAxis=JSON.stringify(newChart.yAxis)
                            newChart.xAxis=JSON.parse(yAxis);
                            newChart.yAxis=JSON.parse(xAxis);
                        }
                        break;
                    case "pie":

                        newChart = JSON.parse(JSON.stringify(this.chartConfig_pie));
                        newChart.legend.data=chartData.xAxisData;

                        var data=[];
                        for (let i = 0; i < chartData.xAxisData.length; i++) {
                            data[i]={};
                            data[i].name=chartData.xAxisData[i];
                            data[i].value=chartData.seriesData[0].data[i];
                        }
                        newChart.series[0].data = data;

                        if(this.mode==1){
                                /**/
                        }else if (this.mode==2) {
                          newChart.series[0].roseType="radius"
                        }else if (this.mode==3) {
                            newChart.series[0].roseType="area"
                        }


                        break;
  /*                  case "scatter":
                        var seriesConfigScatter = JSON.stringify(this.chartConfig_scatter.series[0]);
                        newChart = JSON.parse(JSON.stringify(this.chartConfig_scatter));
                        newChart.series = new Array(seriesDataScatter.length)
                        for (let i = 0; i < seriesDataScatter.length; i++) {
                            let copyObj = JSON.parse(seriesConfigScatter);
                            copyObj.data = seriesDataScatter[i].data;
                            copyObj.name = seriesDataScatter[i].name;
                            newChart.series[i] = copyObj
                        }
                        break;
                    case "map":
                        var seriesConfigMap = JSON.stringify(this.chartConfig_map.series[0]);
                        newChart = JSON.parse(JSON.stringify(this.chartConfig_map));
                        newChart.series = new Array(seriesDataMap.length)
                        for (let i = 0; i < seriesDataMap.length; i++) {
                            let copyObj = JSON.parse(seriesConfigMap);
                            copyObj.data = seriesDataMap[i].data;
                            copyObj.name = seriesDataMap[i].name;
                            newChart.series[i] = copyObj
                        }
                        break;*/
                }
                newChart.id = 0
                newChart.otherSetting.code = this.code;
                newChart.title.text = this.title;
                if(this.chartType!='pie'){
                    newChart.legend.data=this.legendData;
                }

                this.setChartDataIndex0(newChart);
                /*自动展开配置卡*/
                this.toggleDrawer(true,0,this.chartType)
                this.afterLoaded=true;

            },
            loadData(params) {

                let _self = this;
                _self.toggleShowLoading(true);
                getChartDataByCode(params, res => {
                    _self.toggleShowLoading(false);
                 _self.createdNewChart(this.chartType,formatData(res.data,this.legendData));

                })
            },
            saveConfiguration(){
                let _self = this;
                let mycanvas=document.getElementsByTagName('canvas')[0]
                let image=mycanvas.toDataURL("image/png");
                var conversions = base64ToFile(image,"test.png");
                var params = new FormData();
                params.append('file',conversions,"chart")  //第三个参数是文件名，没有文件名会上传失败
                _self.toggleShowLoading(true);
                uploadImg(params,res=>{
                    _self.toggleShowLoading(false);
                    let params={
                        code:this.code,
                        title:this.chartList[0].title.text,
                        type:this.chartType,
                        series_name:this.chartList[0].legend.data,
                        config:this.chartList[0],
                        file_code:res.data.file_code
                    };
                    if(this.id!=-1){
                        params.id=this.id;
                    }
                    _self.toggleShowLoading(true);
                    saveConfigration(params,res=>{
                        _self.toggleShowLoading(false);
                        this.$message.success(res.data.message)
                        this.$router.push({path:"/"})
                    })
                })
                return
            },
            refreshCodeByCode(){
                let _self = this;
                let chart=clone(this.chartList[0]);
                let params={
                    code:this.refreshCode
                }
                _self.toggleShowLoading(true);
                getChartDataByCode(params, res => {
                    _self.toggleShowLoading(false);
                   let formatted=formatData(res.data,chart.legend.data);
                   console.log(formatted)
                  //  _self.createdNewChart(this.chartType,formatData(res.data,this.legendData));
                    switch (this.chartType) {
                        case "bar":
                        case "line":
                            for (let i = 0; i <chart.series.length ; i++) {
                                chart.series[i].data=formatted.seriesData[i].data;
                            }
                            break;
                        case "pie":
                            var data=[];
                            for (let i = 0; i < formatted.xAxisData.length; i++) {
                                data[i]={};
                                data[i].name=formatted.xAxisData[i];
                                data[i].value=formatted.seriesData[0].data[i];
                            }
                            chart.series[0].data = data;
                            break;
                    }
                    this.setChartDataIndex0(chart);
                })

            },
            getDeatails(data){
                console.log(data)
            }
        }
    };
</script>