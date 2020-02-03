<template>
  <div>
    <div id="eContainer"></div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      audio: ""
    };
  },
  
  methods: {
    play(id) {}
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("eContainer"));
    var option = {
      tooltip: {},
      radar: {
        // shape: 'circle',
        center: ["50%", "50%"], //圆心在画布中的位置
        radius: "65%", //外半径长度
        startAngle: 90, //旋转雷达图
        name: {
          //雷达图每个指示器名称的配置项
          show: true, //是否展示各项名字
          //color: "#00BC73", //文字的颜色
          fontWeight: "bolder", //字重
          //fontFamily: "serif", //字体
          fontSize: "12", //字体大小
          backgroundColor: "#000", //背景色
          borderColor: "#FF9901", //边框颜色
          borderWidth: 2,
          borderRadius: 10, //边框圆角
          padding: [5, 5, 5, 5], //内边距
          nameGap: 220,
          splitNumber: 8,
          shape: "circle",
          textStyle: {
            color: "#00BC73", //字体颜色
            backgroundColor: "#fff",
            nameGap: 250 //指示器名称和指示器轴的距离。
          }
        },
        silent: true,
        axisLine: {
          show: false //是否显示坐标轴轴线
        },

        splitArea: {
          show: false //是否显示分隔区域
        },
        indicator: [
          { name: "音乐感受力", max: 5, color: "#333" },
          { name: "音乐常识", max: 5 },
          { name: "单位拍的稳定性", max: 5 },
          { name: "音乐记忆", max: 5 },
          { name: "音乐听觉", max: 5 }
        ]
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          symbolSize: 15,
          areaStyle: {
            color: "#FF3936"
          },
          itemStyle: {
            //折线拐点标志的样式
            borderWidth: 3
          },
          //radarIndex:'image://http://image.yinji.immusician.com/cover/game_material155738285005273.png',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4, 1, 2, 3, 5],
              name: "预算分配（Allocated Budget）"
            }
          ]
        }
      ]
    }
    myChart.setOption(option);
  }
};
</script>
<style lang="less" scoped>
#eContainer {
  width: 100%;
  height: 300px;
}
</style>


