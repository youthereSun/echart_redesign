<template>
    <div id="creatingChart">

        <el-tabs tab-position="left" style="height: 200px;">
            <el-tab-pane  v-for="item in config" :label="item.name">
                <div class="cardsContainer">
                    <div @click="createNewChart(item.type,s.mode)" class="card" v-for="s in item.list">
                        <img class="suolvetu" :src="s.imgSrc">
                        <p class="title">{{s.title}}</p>
                        <p class="description">{{s.description}}</p>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "createNewConfiguration",
        data(){
            return {
                config:[
                    {
                        name:"折线图",
                        type: "line",
                        list:[
                            {   mode:1,
                                imgSrc:require("../assets/chartImg/line11.png"),
                                title:"标准折线图",
                                description:"普通折线图"
                            },{
                                mode:2,
                                imgSrc:require("../assets/chartImg/line3.png"),
                                title:"标准面积图",
                                description:"填充样式，平滑曲线"
                            },{
                                mode:3,
                                imgSrc:require("../assets/chartImg/line5.png"),
                                title:"标准折线图",
                                description:"横纵坐标互换，平滑曲线"
                            },{
                                mode:4,
                                imgSrc:require("../assets/chartImg/line4.png"),
                                title:"堆积面积图",
                                description:"任意系列多维度堆积"
                            }
                        ]
                    },
                    {
                        name:"柱状图",
                        type: "bar",
                        list:[
                            {
                                mode:1,
                                imgSrc:require("../assets/chartImg/bar1.png"),
                                title:"标准柱状图",
                                description:"普通折线图"
                            },
                            {
                                mode:2,
                                imgSrc:require("../assets/chartImg/bar3.png"),
                                title:"标准条形图",
                                description:"柱状图的横纵坐标互换"
                            }
                        ]
                    },
                    {
                        name:"饼状图",
                        type: "pie",
                        list:[
                            {
                                mode:1,
                                imgSrc:require("../assets/chartImg/pie1.png"),
                                title:"标准饼图",
                                description:"基本饼图"
                            },
                            {
                                mode:2,
                                imgSrc:require("../assets/chartImg/pie10.png"),
                                title:"半径模式南丁格尔玫瑰图",
                                description:"半径模式"
                            }, {
                                mode:3,
                                imgSrc:require("../assets/chartImg/pie11.png"),
                                title:"面积模式南丁格尔玫瑰图",
                                description:"面积模式"
                            }

                        ]
                    }



                ]


            }
        },
        methods:{
            createNewChart(type,mode) {
                this.$emit("showDialog",type,mode)
            }
        }
    }
</script>

<style scoped>

</style>