<template>
  <div id='main' :style="{
        width: '100%',
        height: '700px',
        margin:'20px'
      }"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'


onMounted(() => {

  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  var option;

  setTimeout(function () {
    option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          ['其它', 5000, 1000, 8000, 3000, 2500, 6385, 2323, 865, 6545, 872, 4561, 4566],
          ['手饰', 7425, 7575, 6745, 1213, 6542, 3541, 8576, 123, 5768, 8456, 4567, 799],
          ['耳饰', 3575, 5767, 6315, 4532, 4562, 4564, 7555, 8987, 4566, 789, 465, 7893],
          ['项链', 6356, 8533, 5555, 6554, 4565, 4535, 8797, 5645, 8794, 452, 4569, 1645]
        ]
      },
      xAxis: { type: 'category', name: '月份/12' },
      yAxis: { gridIndex: 0, min: 0, max: 9000, interval: 2000, name: '销量' },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    };
    myChart.on('updateAxisPointer', function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    myChart.setOption(option);
  });

  option && myChart.setOption(option);

})

</script>

<style lang=stylus></style>