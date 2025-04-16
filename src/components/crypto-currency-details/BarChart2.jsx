import React, {memo} from 'react';
import {View, Dimensions} from 'react-native';
import Echarts from 'react-native-echarts-pro';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const BarChart2 = memo(() => {
  const screenWidth = Dimensions.get('window').width;

  const barChartData = [
    29.171796, 26.835694, 35.065844, 30.418636, 30.849026, 32.541207, 36.025465,
    31.710203, 29.171796, 29.602186, 28.741407, 31.279813, 34.635454, 26.835694,
    25.564564, 33.832774, 30.849026, 30.418636, 29.171796, 31.710203, 31.279813,
    32.541207, 33.832774, 32.972597, 29.602186, 31.279813, 30.849026, 26.405304,
    28.741407, 30.418636,
  ];

  // Create matching xAxis labels
  const xAxisData = barChartData.map((_, i) => `${i + 1}:00`);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'},
    },
    grid: {
      left: '2',
      right: '20',
      bottom: '0',
      top: '10',
      containLabel: true,
    },
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {type: 'cross'},
      confine: true,
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
      min: 25.564564,
      max: 36.025465,
      interval: 36,
      splitLine: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        show: false,
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
        barWidth: 5,
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
        height: responsiveHeight(5),
        backgroundColor: 'transparent',
      }}>
      <Echarts
        option={option}
        height={responsiveHeight(5)}
        width={screenWidth}
      />
    </View>
  );
});

export default BarChart2;
