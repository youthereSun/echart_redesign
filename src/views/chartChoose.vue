<template>
    <div id="chartChoose">
        <el-dialog
                class="codeDialog"
                top="300px"
                title="新增"
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
    <el-button @click="editChart" type="primary">下 一 步</el-button>
            </span>
        </el-dialog>
        <div class="blockHolder">
            <div class="title">创建图表</div>
            <div @click="viewMyChart" class="myChartView">查看所有</div>
        </div>
        <div class="cardContainer">
            <el-row :gutter="20" v-cloak>
                <el-col class="padding_bottom_20" v-for="item in chartTypeList" :key="item.id" :span="8">
                    <el-card :body-style="{ padding: '30px' }">
                        <img @click="createNewChart(item.type)" class="chartImg" :src="item.src">
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chartChoose",
        data() {
            return {
                chartTypeList: [
                    {id: 1, type: "line", src: require("../assets/chartImg/line.png")},
                    {id: 2, type: "bar", src: require("../assets/chartImg/bar.png")},
                    {id: 3, type: "pie", src: require("../assets/chartImg/pie.png")},
                    {id: 4, type: "scatter", src: require("../assets/chartImg/scatter.png")},
                    {id: 5, type: "map", src: require("../assets/chartImg/map.png")}
                ],
                dialogVisible: false,
                code: "",
                title: "",
                chartType: "",
                dynamicTags: ['默认'],
                inputVisible: false,
                inputValue: '',
                showSeriesAdd: true,
                tempTag: '',
                isChange: false,
                isRepeatedData:false,
            }
        },
        methods: {
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
            createNewChart(type) {
                this.dialogVisible = true;
                this.chartType = type;
                this.showSeriesAdd = true
                if (type == "pie") {
                    this.showSeriesAdd = false
                    this.dynamicTags = [""];
                }
            },
            viewMyChart() {
                this.$router.push({path: "/configs"})
            },
            editChart() {
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
