<template>
  <div class="about">
    <h1>echart</h1>
  </div>
</template>
<script>
  import deepClone from "../utils/deepClone";
  export default {
    data(){
      return{
        testObj:{
          otherSetting: {
            chartHeight: "400px",
            chartWidth: "700px",
            chartType: "line",
            chartTheme: "",
            backgroundClass: ""
          },
          func:(function test(){
            console.log(1)
          })(),
          today:new Date(1536627600000),
          reg:new RegExp('\\w+'),
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
            subtext: "副标题",
            x: "left",
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
                show: true
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
              boundaryGap: false,
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
        }

      }
    },
    created() {
      let a=deepClone(this.testObj)
      let b=JSON.parse(JSON.stringify(this.testObj))
      console.log( a.func);
      console.log( this.testObj.func)
      console.log( b.func)
      a.func;
      this.testObj.func;
    }
  }

</script>
