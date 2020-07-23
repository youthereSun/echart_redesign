<template>
    <div id="configs">
        <el-container>
            <el-dialog
                    class="codeDialog"
                    top="300px"
                    title="基本信息"
                    :visible.sync="dialogVisible"
                    width="40%"
                    center>
                <el-input
                        placeholder="请输入code"
                        v-model="code"
                        clearable>
                </el-input>
                <el-input
                        placeholder="请输入标题"
                        v-model="title"
                        clearable>
                </el-input>
                <div v-if="showSeriesAdd">
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @click="changeValue(tag)"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加系列</el-button>
                </div>

                <span slot="footer" class="dialog-footer">
    <el-button @click="toEditChart" type="primary">下 一 步</el-button>
            </span>
            </el-dialog>
            <el-dialog   center class="selectChart" :visible.sync="showSample">
                <create-new-configuration @showDialog="createNewChart"/>
                <div @click="showSample=false" class="el-icon-close closeSample"></div>
            </el-dialog>
            <el-header>
                <div class="configTitle">Logwire-BI 我的作品</div>
            </el-header>
            <div class="cardContainer">
                <div @mouseenter="item.flag=true" @mouseleave="item.flag=flag" class="imgContainer" v-for="item in configurationList"
                     :key="item.id">
                    <img class="chartImg" :src="item.file | base64Fliter">
                    <div class="imgTitle">{{item.title}}(code:{{item.code}})</div>
                    <div :class="item.flag?'passing':'imgOperation'">

                        <div  class="imgOperationButton">
                            <el-button  @click="editChart(item.id,item.code)"  type="primary" icon="el-icon-edit" circle></el-button>
                        </div>
                        <div  class="imgOperationButton">

                            <el-button  @click="deleteChart(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                        </div>
                    </div>
                </div>
                <div @click="addNew"  class="imgContainer newConfigurationContainer" >
                   <i class="iconfont icon-add1 newConfiguration"></i>
                </div>
            </div>
        </el-container>

    </div>
</template>

<script>
    import {getAllConfiguration,viewChartById,deleteConfiguration} from "../api/api";
    import {mapMutations} from "vuex";
    import createNewConfiguration from "../components/createNewConfiguration";

    export default {
        name: "configs",
        data() {
            return {
                configurationList: [],
                flag: false,
                dialogVisible:false,
                showSample:false,
                code: "",
                title: "",
                chartType: "",
                dynamicTags: ['默认'],
                tempTag: '',
                isChange: false,
                isRepeatedData:false,
                inputVisible: false,
                inputValue: '',
                showSeriesAdd:false

            }
        },
        filters:{
            base64Fliter:function (val) {
                return "data:image/png;base64,"+val
            }
        },
        components:{
            createNewConfiguration
        },
        created() {
            this.getConfiguration()
        },
        methods: {
            ...mapMutations([ "toggleShowLoading","setChartDataIndex0"]),
            getConfiguration() {
                let _self=this;
                _self.toggleShowLoading(true);
                getAllConfiguration(res => {
                    _self.toggleShowLoading(false);
                    this.configurationList = res.data;
                })
            },
            addNew(){
                this.showSample=true
                //this.$router.push({path: "/"})
            },
/*            viewChart(id){
                let params={
                    id:id
                }
                viewChartById(params,res=>{
                    this.setChartDataIndex0(JSON.parse(res.data.config))
                    this.$router.push({path:"/home"})
                })

            },*/
            editChart(id,code){
                let _self=this;
                let params={
                    id:id
                }
                _self.toggleShowLoading(true);
                viewChartById(params,res=>{
                    _self.toggleShowLoading(false);
                    this.setChartDataIndex0(JSON.parse(res.data.config))
                    this.$router.push({path:"/home",query:{type:res.data.type,id:res.data.id,refreshCode:code}})
                })

            },
            deleteChart(id){
                let _self=this;
                let params={
                    id:id
                }
                _self.toggleShowLoading(true);
                deleteConfiguration(params,res=>{
                    if(res.message=="请求成功"){
                        _self.toggleShowLoading(false);
                        this.$message.success("删除配置成功！")
                        this.getConfiguration();
                    }else {
                        this.$message.info("发生错误")
                    }
                })

            },
            createNewChart(type) {
                this.showSample=false;
                this.dialogVisible = true;
                this.chartType = type;
                this.showSeriesAdd = true
                if (type == "pie") {
                    this.showSeriesAdd = false
                    this.dynamicTags = [""];
                }
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.tempTag = '';
                this.inputVisible = true;
                this.inputValue = '';
                this.isChange = false;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                this.isRepeatedData = false;
                let inputValue = this.inputValue;
                //去除空格
                inputValue = inputValue.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                if(inputValue == ''){
                    this.inputVisible = false;
                    return;
                }
                //判断新增的值是否重复
                if(this.dynamicTags.indexOf(inputValue) != -1 && this.tempTag != inputValue){
                    this.isRepeatedData = true;
                    this.openWarring();
                    return;
                }
                else{
                    this.isRepeatedData = false;
                }
                //判断是否修改原有的值，是则替换修改好的值，否则新增
                if(this.isChange){
                    this.dynamicTags[this.dynamicTags.indexOf(this.tempTag)] = this.inputValue;
                    this.inputVisible = false;
                    return;
                }
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            changeValue(tag){
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
                this.inputValue = tag;
                this.tempTag = tag;
                this.isChange = true;
            },

            //提示
            openWarring(text) {
                if(!text){
                    var text = '警告!不允许添加重复数据！';
                }
                this.$message({
                    message: text,
                    type: 'warning',
                    duration: '1000'
                });
            },
            toEditChart() {
                if (this.code && this.title && this.dynamicTags.length > 0) {
                    this.$router.push({
                        path: '/home',   //跳转的路径
                        query: {           //路由传参时push和query搭配使用 ，作用时传递参数
                            type: this.chartType,
                            code: this.code,
                            title: this.title,
                            legendData: this.dynamicTags
                        }
                    })
                } else {
                    this.$message.error('请完善必填字段');
                }
            },
        }
    }
</script>
<style>


</style>
