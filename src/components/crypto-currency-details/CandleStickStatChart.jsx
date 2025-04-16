import React, {memo} from 'react';
import {View, Dimensions} from 'react-native';
import Echarts from 'react-native-echarts-pro';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const CandleStickStatChart = memo(() => {
  const screenWidth = Dimensions.get('window').width;

  // 15-minute interval sample data (Open, Close, Low, High)
  const candlestickData = [
    [0.0315, 0.0317, 0.0314, 0.0318],
    [0.0317, 0.0318, 0.0316, 0.0319],
    [0.0318, 0.0316, 0.0315, 0.032],
    [0.0316, 0.0319, 0.0315, 0.0321],
    [0.0319, 0.032, 0.0318, 0.0322],
    [0.0312, 0.0314, 0.0311, 0.0316],
    [0.0314, 0.0313, 0.0312, 0.0317],
    [0.0313, 0.0311, 0.031, 0.0315],
    [0.0311, 0.0315, 0.031, 0.0316],
    [0.0315, 0.0317, 0.0314, 0.0318],
    [0.0317, 0.0318, 0.0316, 0.0319],
    [0.0318, 0.0316, 0.0315, 0.032],
    [0.0316, 0.0319, 0.0315, 0.0321],
    [0.0319, 0.032, 0.0318, 0.0322],
    [0.0319, 0.032, 0.0318, 0.0322],
    [0.0312, 0.0314, 0.0311, 0.0316],
    [0.0314, 0.0313, 0.0312, 0.0317],
    [0.0313, 0.0311, 0.031, 0.0315],
    [0.0319, 0.032, 0.0318, 0.0322],
    [0.0312, 0.0314, 0.0311, 0.0316],
    [0.0314, 0.0313, 0.0312, 0.0317],
    [0.0313, 0.0311, 0.031, 0.0315],
    [0.0311, 0.0315, 0.031, 0.0316],
  ];

  // Updated xAxisData to have 30 points
  const xAxisData = Array.from({length: 24}, (_, i) => `15: ${i + 1}`);

  // Candlestick chart options
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'},
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false},
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitLine: {show: false},
      axisLabel: {show: false},
    },
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {type: 'cross'},
      confine: true,
    },
    series: [
      {
        name: 'Price',
        type: 'candlestick',
        data: candlestickData,
        itemStyle: {
          color: '#F8E2B3',
          color0: '#92928E',
          borderColor: '#F8E2B3',
          borderColor0: '#92928E',
          wickColor: '#F8E2B3',
        },
      },
    ],
  };

  return (
    <View
      style={{
        width: screenWidth,
        height: responsiveHeight(6.5),
        backgroundColor: 'transparent',
      }}>
      <Echarts
        option={option}
        height={responsiveHeight(6.5)}
        width={screenWidth}
      />
    </View>
  );
});

export default CandleStickStatChart;
