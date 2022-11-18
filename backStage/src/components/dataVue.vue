<template>
  <div class="con" style="width:100%">
    <div class="title">销量统计</div>
    <div id='main' :style="{
        width: '100%',
        height: '700px',
        margin:'20px'
      }"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
// 数据统计
const statistical = reactive({
  // 总数据
  arr: [],
});

const lbData = reactive({
  // 类别
  other: {
    title: "其它",
    data: [],
  },
  Necklace: {
    title: "项链",
    data: [],
  },
  SRoleOfing: {
    title: "手饰",
    data: [],
  },
  earrings: {
    title: "耳饰",
    data: [],
  },
});

let max = 0;

for (let k in lbData) {
  max = max > Math.max(...lbData[k].data) ? max : Math.max(...lbData[k].data);
}

if (max <= 200) max = 200;

// 数据结构
// const { other, Necklace, SRoleOfing, earrings } = statistical.category;

// 生成统计表
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;

  let arr = [];
  let leng = [];
  // 数据请求
  (proxy as any).$axios
    .post("/seldata", { table: "cart" })
    .then((data) => {
      for (let k in lbData) {
        leng = data.data.filter((data) => {
          return data.title.includes(
            lbData[k].title == "手饰"
              ? "手链"
              : lbData[k].title != "手链" &&
                lbData[k].title != "项链" &&
                lbData[k].title != "耳饰"
              ? !lbData[k].title
              : lbData[k].title
          );
        });
        for (var i = 0; i < 12; i++) arr[i] = 0;

        for (var i = 0; i < leng.length; i++) {
          if (arr.indexOf(arr[new Date(leng[i].stime).getMonth()]) != -1) {
            arr[new Date(leng[i].stime).getMonth()] += leng[i].num * 1;
          } else {
            arr[new Date(leng[i].stime).getMonth()] = leng[i].num * 1;
          }
        }
        lbData[k].data = arr;
        arr = [];
      }
      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              [
                "product",
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              [lbData.other.title, lbData.other.data].flat(),
              [lbData.Necklace.title, lbData.Necklace.data].flat(),
              [lbData.SRoleOfing.title, lbData.SRoleOfing.data].flat(),
              [lbData.earrings.title, lbData.earrings.data].flat(),
            ],
          },
          xAxis: { type: "category", name: "月份/12" },
          yAxis: {
            gridIndex: 0,
            min: 0,
            max: max,
            interval: Math.floor(max / 5),
            name: "总计",
          },
          grid: { top: "55%" },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: {
                focus: "self",
              },
              label: {
                formatter: "销量/{b}: {@1} ",
              },
              encode: {
                itemName: "product",
                value: "1月",
                tooltip: "1月",
              },
            },
          ],
        };
        myChart.on("updateAxisPointer", function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
        myChart.setOption(option);
      });
    })
    .catch((errr) => {
      router.push({
        path: "/login",
      });
    });
});
</script>

<style lang=less scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
}
</style>