import React, {memo, useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import Echarts from 'react-native-echarts-pro';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeContext';
import {useSelector} from 'react-redux';
import {selectSymbolPrice} from '../../redux/features/price/priceSlice';

const BarChart = memo(() => {
  const screenWidth = Dimensions.get('window').width;
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  const price = useSelector(selectSymbolPrice('EURUSD'));

  const [barChartData1, setBarChartData1] = useState([]);
  console.log('🚀 ~ BarChart ~ barChartData1:', barChartData1);

  useEffect(() => {
    if (!price) return;

    setBarChartData1(prev => {
      const updated = [...prev, price];
      return updated.slice(-100); // or however many points you want
    });
  }, [price]);

  const barChartData = [
    29.171796, 26.835694, 35.065844, 30.418636, 30.849026, 32.541207, 36.025465,
    31.710203, 29.171796, 29.602186, 28.741407, 31.279813, 34.635454, 26.835694,
    27.564564, 33.832774, 30.849026, 30.418636, 29.171796, 31.710203, 31.279813,
    32.541207, 33.832774, 32.972597, 29.602186, 31.279813, 30.849026, 26.405304,
    28.741407, 30.418636, 32.541207, 33.832774, 32.972597, 29.602186, 31.279813,
    30.849026, 26.405304, 28.741407, 30.418636,
  ];

  // Create matching xAxis labels
  const xAxisData = Array.from({length: 30}, (_, i) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + i);
    return date.toTimeString().slice(0, 5); // "HH:MM" format
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'},
    },
    grid: {
      left: '8',
      right: '28',
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
      boundaryGap: true,
      axisLine: {show: false},
      axisLabel: {
        show: true,
      },
      axisTick: {show: false},
    },
    yAxis: {
      type: 'value',
      min: 25.56454,
      max: 36.02545,
      interval: 36, // only two labels: 0 and 36 by default
      splitLine: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        show: true,
        color: '#aaa',
        fontSize: 10,
        align: 'left',
        margin: 10,
      },
      position: 'right',
    },
    dataZoom: [
      {
        type: 'inside',
        show: false,
        xAxisIndex: 0,
        start: 20, // show last 40% by default
        end: 100,
      },
    ],

    series: [
      {
        name: 'Bars 1',
        type: 'bar',
        data: barChartData,
        barWidth: 5,
        barGap: '50%',
        itemStyle: {
          color: darkMode ? '#616161' : '#9b9999',
          borderColor: darkMode ? '#616161' : '#9b9999',
          borderWidth: 1.5,
        },
      },
    ],
  };

  return (
    <View
      style={{
        width: screenWidth,
        height: responsiveHeight(7.5),
        backgroundColor: 'transparent',
      }}>
      <Echarts
        option={option}
        height={responsiveHeight(7.5)}
        width={screenWidth}
      />
    </View>
  );
});

export default BarChart;
