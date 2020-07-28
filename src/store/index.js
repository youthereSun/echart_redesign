import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const PERSIST_PATHS = ['chartList']
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
    })
}
export default new Vuex.Store({
    plugins:[myPlugin,createPersistedState({storage:window.sessionStorage,
        paths: PERSIST_PATHS
    })],
    state: {
        showLoading:false,
        drawerOption: {
            pressOnEsc: true,
            modal: false,
            direction: "ltr",
            showClose: false,
            withHeader: false
        },
        tabsOption: {
            tabType: "",
            tabPosition: "left",
            stretch: true
        },
        vueScrollOption: {
            vuescroll: {
                mode: 'native',//选择一个模式, native 或者 slide(pc&app)
                sizeStrategy: 'percent',//如果父容器不是固定高度，请设置为 number , 否则保持默认的percent即可
                detectResize: true//是否检测内容尺寸发生变化
            },
            scrollPanel: {
                initialScrollY: false,//只要组件mounted之后自动滚动的距离。 例如 100 or 10%
                initialScrollX: false,
                scrollingX: true,//是否启用 x 或者 y 方向上的滚动
                scrollingY: true,
                speed: 300,//多长时间内完成一次滚动。 数值越小滚动的速度越快
                easing: undefined,//滚动动画 参数通animation
                verticalNativeBarPos: 'right'//原生滚动条的位置
            },
            rail: {//轨道
                background: '#f0000',//轨道的背景色
                opacity: 0,
                size: '6px',
                specifyBorderRadius: false,//是否指定轨道的 borderRadius， 如果不那么将会自动设置
                gutterOfEnds: null,
                gutterOfSide: '0px',//轨道距 x 和 y 轴两端的距离
                keepShow: false //是否即使 bar 不存在的情况下也保持显示
            },
            bar: {
                showDelay: 500,//在鼠标离开容器后多长时间隐藏滚动条
                onlyShowBarOnScroll: false,//当页面滚动时显示
                keepShow: false,//是否一直显示
                background: '#f6f6f6',
                opacity: .6,
                hoverStyle: false,
                specifyBorderRadius: false,
                minSize: false,
                size: '6px',
                disable: false,//是否禁用滚动条
            },// 在这里设置全局默认配置
            name: 'vuescroll' // 在这里自定义组件名字，默认是vueScroll
        },
        bgList: [
            {id: 1, name: "bg1", src: require("../assets/bg/bg1.png")},
            {id: 2, name: "bg2", src: require("../assets/bg/bg2.png")},
            {id: 3, name: "bg3", src: require("../assets/bg/paper-bg.jpg")},
            {id: 4, name: "bg4", src: require("../assets/bg/wood-bg.jpg")},
            {id: 5, name: "bg5", src: require("../assets/bg/bg5.jpg")},
            {id: 6, name: "bg6", src: require("../assets/bg/bg6.jpg")},
        ],
        chartList: [
          /*  {
                id:0,
                otherSetting: {
                    chartHeight: "452px",
                    chartWidth: "700px",
                    chartType:"pie",
    chartTheme:""

},
title: {
    text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center",
        y: "top",
        textAlign: "left",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderWidth: 0,
        borderColor: "rgba(255, 255, 255, 1)",
        padding: 0,
        itemGap: 5,
        textStyle: {
        color: "rgba(0, 0, 0, 1)",
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: "bold",
            align: "left",
            baseline: "top"
    },
    subtextStyle: {
        color: "rgba(0, 0, 0, 0.65)",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "normal",
            align: "left",
            baseline: "top"
    }
},
tooltip: {
    trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        show: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderWidth: 0,
        borderColor: "#333",
        borderRadius: 4,
        padding: 5,
        textStyle: {
        color: "#fff",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal",
            align: "center",
            baseline: "middle"
    }
},
legend: {
    orient: "vertical",
        x: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        show:true,
        selectedMode: "multiple",
        y: "top",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        borderColor: "#ccc",
        padding: 5,
        itemWidth: 20,
        itemHeight: 14,
        itemGap: 10,
        textStyle: {
        color: "rgba(0, 0, 0, 1)",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal",
            align: "center",
            baseline: "middle"
    }
},
toolbox: {
    show: true,
        feature: {
        mark: {
            show: true
        },
        dataView: {
            show: true,
                readOnly: true
        },
        restore: {
            show: true
        },
        saveAsImage: {
            show: true
        }
    }
},
calculable: true,
    series: [
    {
        name: "访问来源",
        type: "pie",
        radius: [0,100],
        center: ["50%", "60%"],
        data: [
            {
                value: 335,
                name: "直接访问"
            },
            {
                value: 310,
                name: "邮件营销"
            },
            {
                value: 234,
                name: "联盟广告"
            },
            {
                value: 135,
                name: "视频广告"
            },
            {
                value: 1548,
                name: "搜索引擎"
            }
        ],
        roseType: "",
        startAngle: 0,
        minAngle: 0,
        selectedMode: "single",
        selectedOffset: 20,
        itemStyle: {
            normal: {
                labelLine: {
                    show: false
                },
                borderWidth: 0,
                borderColor: "rgba(255, 255, 255, 1)",
                label: {
                    show: false
                }
            }
        }
    }
],
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"]
}*/
        ],
        currentChartId: 0,
        /*不同图表基本配置[0]："line"||"bar",[1]:"pie"，[2]:"scatter",[3]:"map"*/
        chartBaseConfig: [
            {
                otherSetting: {
                    code:"",
                    chartHeight: "250px",
                    chartWidth: "450px",
                    chartType: "line",
                    chartTheme: "",
                    backgroundClass: "bg5"
                },
                dataZoom: [

                    {
                        type: 'slider',
                        show: false,
                        xAxisIndex: [0],
                        start: 0,
                        end: 100,
                        backgroundColor: "rgba(47,69,84,0)",  //组件的背景颜色
                    },
                    {
                        type: 'slider',
                        show: false,
                        yAxisIndex: [0],
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        disabled: true,
                        start: 1,
                        end: 100
                    },
                    {
                        type: 'inside',
                        disabled: true,
                        yAxisIndex: [0],
                        start: 1,
                        end: 100
                    }
                ],
                title: {
                    text: "主标题",
                    subtext: "",
                    x: "left",
                    y: "top",
                    textAlign: "left",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderWidth: 0,
                    borderColor: "rgba(255, 255, 255, 1)",
                    padding: 10,
                    itemGap: 5,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 18,
                        fontStyle: "normal",
                        fontWeight: "bold",
                        align: "left",
                        baseline: "top"
                    },
                    subtextStyle: {
                        color: "rgba(0, 0, 0, 0.65)",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "left",
                        baseline: "top"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    show: true,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderWidth: 0,
                    borderColor: "#333",
                    borderRadius: 4,
                    padding: 5,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    },
                    axisPointer: {
                        show: false,
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                legend: {
                    show: true,
                    data: [],/*创建时配置*/
                    selectedMode: "multiple",
                    x: "center",
                    y: "top",
                    orient: "horizontal",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "#ccc",
                    padding: 5,
                    itemWidth: 20,
                    itemHeight: 14,
                    itemGap: 10,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        magicType: {
                            show: false,
                            type: ["line", "bar"]
                        },
                        restore: {
                            show: false
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: true,
                        data: [],/*创建时配置*/
                        position: "bottom",
                        name: "",
                        nameLocation: "end",
                        nameTextStyle: {
                            color: "rgb(0, 0, 0)",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            align: "center",
                            baseline: "middle"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#757575",
                                width: 2,
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            margin: 20,
                            formatter: "{value}",
                            textStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: "normal",
                                align: "center",
                                baseline: "middle"
                            }
                        },
                        axisTick: {
                            show: false,
                            interval: 0,
                            inside: true,
                            length: 5,
                            lineStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(133, 130, 130, 0.43)",
                                width: 1,
                                type: "solid"
                            }
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                type: "default",
                                color: "rgba(255, 255, 255, 0)"
                            }
                        }

                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "",/*创建时配置*/
                        nameTextStyle: {
                            color: "rgb(0, 0, 0)",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            align: "center",
                            baseline: "middle"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#757575",
                                width: 2,
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            margin: 20,
                            formatter: "{value}",
                            textStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: "normal",
                                align: "center",
                                baseline: "middle"
                            }
                        },
                        axisTick: {
                            show: false,
                            interval: 0,
                            inside: true,
                            length: 5,
                            lineStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(133, 130, 130, 0.43)",
                                width: 1,
                                type: "solid"
                            }
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                type: "default",
                                color: "rgba(255, 255, 255, 0)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "",/*创建时配置*/
                        type: "",

                        data: [],/*创建时配置*/
                        symbol: "roundRect",
                        symbolSize: 10,
                        symbolRotate: 0,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: "default",
                                    opacity: 0
                                },
                                color: "",
                                lineStyle: {
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(255, 255, 255, 1)",
                                    shadowOffsetY: 0,
                                    width: 2,
                                    type: "solid",
                                    shadowBlur: 0
                                }
                            }
                        }
                    }

                ],
                grid: {
                    show: false,
                    x: 50,
                    y: 70,
                    x2: 50,
                    y2: 50,
                    backgroundColor: "rgb(255,255,255, 0)",
                    borderWidth: 0,
                    borderColor: "rgb(255,255,255, 1)",
                }
            },
            {
                otherSetting: {
                    code:"",
                    chartHeight: "450px",
                    chartWidth: "700px",
                    chartType: "pie",
                    chartTheme: "",
                    backgroundClass: "bg5"

                },
                title: {
                    text: "主标题",
                    subtext: "",
                    x: "center",
                    y: "top",
                    textAlign: "left",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderWidth: 0,
                    borderColor: "rgba(255, 255, 255, 1)",
                    padding: 10,
                    itemGap: 5,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 18,
                        fontStyle: "normal",
                        fontWeight: "bold",
                        align: "left",
                        baseline: "top"
                    },
                    subtextStyle: {
                        color: "rgba(0, 0, 0, 0.65)",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "left",
                        baseline: "top"
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    show: true,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderWidth: 0,
                    borderColor: "#333",
                    borderRadius: 4,
                    padding: 5,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: [],/*待补充*/
                    show: true,
                    selectedMode: "multiple",
                    y: "top",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "#ccc",
                    padding: 5,
                    itemWidth: 20,
                    itemHeight: 14,
                    itemGap: 10,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: false
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: false
                        },
                        saveAsImage: {
                            show: true
                        }
                    },
                },
                calculable: true,
                series: [
                    {
                        center: ["50%", "60%"],
                        name: "默认",/*待补充*/
                        type: "pie",
                        radius: [30, 150],
                        data: [],/*待补充*/
                        roseType: "",
                        startAngle: 0,
                        minAngle: 0,
                        selectedMode: "single",
                        selectedOffset: 20,
                        itemStyle: {
                            normal: {
                                labelLine: {
                                    show: false,

                                },
                                borderWidth: 0,
                                borderColor: "rgba(255, 255, 255, 1)",
                                label: {
                                    show: false,
                                    formatter: "{b} :{c}({d}%)"
                                }
                            }
                        }
                    }
                ],
                backgroundColor: "rgba(255, 255, 255, 0)",
            },
            {
                otherSetting: {
                    code:"",
                    chartHeight: "400px",
                    chartWidth: "700px",
                    chartType: "scatter",
                    chartTheme: "",
                    backgroundClass: "bg5"
                },
                dataZoom: [

                    {
                        type: 'slider',
                        show: false,
                        xAxisIndex: [0],
                        start: 0,
                        end: 100,
                        height: 15,
                        backgroundColor: "rgba(47,69,84,0)",  //组件的背景颜色,
                        bottom: 0
                    },
                    {
                        type: 'slider',
                        show: false,
                        yAxisIndex: [0],
                        start: 0,
                        width: 15,
                        end: 100,
                        right: 0
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        disabled: true,
                        start: 1,
                        end: 100
                    },
                    {
                        type: 'inside',
                        disabled: true,
                        yAxisIndex: [0],
                        start: 1,
                        end: 100
                    }
                ],
                title: {
                    text: "主标题",
                    subtext: "",
                    x: "left",
                    y: "top",
                    textAlign: "left",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderWidth: 0,
                    borderColor: "rgba(255, 255, 255, 1)",
                    padding: 10,
                    itemGap: 5,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 18,
                        fontStyle: "normal",
                        fontWeight: "bold",
                        align: "left",
                        baseline: "top"
                    },
                    subtextStyle: {
                        color: "rgba(0, 0, 0, 0.65)",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "left",
                        baseline: "top"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    show: true,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderWidth: 0,
                    borderColor: "#333",
                    borderRadius: 4,
                    padding: 5,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    },
                    axisPointer: {
                        show: false,
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                legend: {
                    show: true,
                    data: [],/*创建时配置*/
                    selectedMode: "multiple",
                    x: "center",
                    y: "top",
                    orient: "horizontal",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "#ccc",
                    padding: 5,
                    itemWidth: 20,
                    itemHeight: 14,
                    itemGap: 10,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        magicType: {
                            show: false,
                            type: ["line", "bar"]
                        },
                        restore: {
                            show: false
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        boundaryGap: false,
                        position: "bottom",
                        name: "",
                        nameLocation: "end",
                        nameTextStyle: {
                            color: "rgb(0, 0, 0)",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            align: "center",
                            baseline: "middle"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#757575",
                                width: 2,
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            margin: 20,
                            formatter: "{value}",
                            textStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: "normal",
                                align: "center",
                                baseline: "middle"
                            }
                        },
                        axisTick: {
                            show: false,
                            interval: 0,
                            inside: true,
                            length: 5,
                            lineStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(133, 130, 130, 0.43)",
                                width: 1,
                                type: "solid"
                            }
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                type: "default",
                                color: "rgba(255, 255, 255, 0)"
                            }
                        }

                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        name: "",/*创建时配置*/
                        nameTextStyle: {
                            color: "rgb(0, 0, 0)",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            align: "center",
                            baseline: "middle"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#757575",
                                width: 2,
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            margin: 20,
                            formatter: "{value}",
                            textStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: "normal",
                                align: "center",
                                baseline: "middle"
                            }
                        },
                        axisTick: {
                            show: false,
                            interval: 0,
                            inside: true,
                            length: 5,
                            lineStyle: {
                                color: "rgba(0, 0, 0, 1)",
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(133, 130, 130, 0.43)",
                                width: 1,
                                type: "solid"
                            }
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                type: "default",
                                color: "rgba(255, 255, 255, 0)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "scatter",
                        data: []
                    }

                ],
                grid: {
                    show: false,
                    x: 50,
                    y: 70,
                    x2: 50,
                    y2: 50,
                    backgroundColor: "rgb(255,255,255, 0)",
                    borderWidth: 0,
                    borderColor: "rgb(255,255,255, 1)",
                }
            },
            {
                otherSetting: {
                    code:"",
                    chartHeight: "400px",
                    chartWidth: "700px",
                    chartType: "map",
                    chartTheme: "",
                    backgroundClass: "bg5"
                },

                title: {
                    text: '主标题',
                    subtext: '',
                    x: "left",
                    y: "top",
                    textAlign: "left",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderWidth: 0,
                    borderColor: "rgba(255, 255, 255, 1)",
                    padding: 10,
                    itemGap: 5,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 18,
                        fontStyle: "normal",
                        fontWeight: "bold",
                        align: "left",
                        baseline: "top"
                    },
                    subtextStyle: {
                        color: "rgba(0, 0, 0, 0.65)",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "left",
                        baseline: "top"
                    }

                },
                tooltip: {
                    trigger: 'item',
                    show: true,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderWidth: 0,
                    borderColor: "#333",
                    borderRadius: 4,
                    padding: 5,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                legend: {
                    show: true,
                    data: ['iphone3', 'iphone4', 'iphone5'],
                    selectedMode: "multiple",
                    x: "center",
                    y: "top",
                    orient: "horizontal",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "#ccc",
                    padding: 5,
                    itemWidth: 20,
                    itemHeight: 14,
                    itemGap: 10,
                    textStyle: {
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        baseline: "middle"
                    }
                },
                visualMap: {
                    min: 0,
                    max: 2500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: false},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [],
                    }
                ]
            }

        ]
    },
    mutations: {
        setDrawerOption(state, new_drawerOption) {
            state.drawerOption = new_drawerOption
        },
        setCurrentChartId(state, id) {
            state.currentChartId = id;
        },
        setChartData(state, newChartData) {
            state.chartList[this.currentChartId] = newChartData
            //   Vue.set(state.chartList, state.currentChartId, newChartData)
        },
        setChartDataIndex0(state, newChartData) {
            Vue.set(state.chartList, 0, newChartData)
        },
        toggleShowLoading(state,status){
            state.showLoading=status;
        }
    },
    actions: {},
    modules: {}
})
