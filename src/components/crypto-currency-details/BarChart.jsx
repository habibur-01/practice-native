import React, {memo} from 'react';
import {View, Dimensions} from 'react-native';
import Echarts from 'react-native-echarts-pro';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const BarChart = memo(() => {
  const screenWidth = Dimensions.get('window').width;

  const barChartData = [
    10, 8, 28, 12, 13, 16, 29, 15, 10, 11, 9, 14, 26, 8, 6, 19, 13, 12, 10, 15,
    14, 16, 20, 18, 11, 14, 13, 7, 9, 12,
  ];

  // Create matching xAxis labels
  const xAxisData = barChartData.map((_, i) => `${i + 1}:00`);
  const yAxisData = [25.564564, 36.025465];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'},
    },
    grid: {
      left: '8',
      right: '22',
      bottom: '0',
      top: '0',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {show: false},
      axisLabel: {
        show: true,
      },
      axisTick: {show: false},
    },
    yAxis: {
      type: 'value',
      data: yAxisData,
      scale: true,
      min: 0,
      max: 36,
      splitNumber: 1,
      splitLine: {lineStyle: {color: 'transparent'}},
      axisLine: {show: false},
      axisLabel: {
        show: true,
        color: '#aaa',
        fontSize: 10,
        align: 'left',
        margin: 10,
      },
      position: 'right',
    },
    series: [
      {
        name: 'Bars 1',
        type: 'bar',
        data: barChartData,
        barWidth: 6,
        barGap: '50%',
        itemStyle: {
          color: '#616161',
          borderColor: '#616161',
          borderWidth: 1.5,
        },
      },
    ],
  };

  return (
    <View
      style={{
        width: screenWidth,
        height: responsiveHeight(10),
        backgroundColor: 'transparent',
      }}>
      <Echarts
        option={option}
        height={responsiveHeight(10)}
        width={screenWidth}
      />
    </View>
  );
});

export default BarChart;
