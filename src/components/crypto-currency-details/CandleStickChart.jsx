import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Svg, {Line, Rect, Text} from 'react-native-svg';
import {useTheme} from '../../theme/ThemeContext';

const Candlestick = () => {
  const width = Dimensions.get('window').width;
  const height = responsiveHeight(20);
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark';

  const candleWidth = 8;
  const labelWidth = 65;
  const labelPadding = 10;
  const candleOffsetX = 10;

  const chartWidth = width - labelWidth - labelPadding - 20;

  const [data, setData] = useState([
    {open: 50, high: 80, low: 40, close: 70},
    {open: 70, high: 90, low: 60, close: 65},
    {open: 65, high: 85, low: 55, close: 75},
    {open: 75, high: 85, low: 65, close: 60},
    {open: 60, high: 70, low: 50, close: 68},
    {open: 50, high: 80, low: 40, close: 70},
    {open: 70, high: 90, low: 60, close: 65},
    {open: 65, high: 85, low: 55, close: 75},
    {open: 75, high: 85, low: 65, close: 60},
    {open: 60, high: 70, low: 50, close: 68},
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const newOpen = last.close;
        const newClose = newOpen + (Math.random() * 10 - 5); // random change
        const newHigh = Math.max(newOpen, newClose) + Math.random() * 5;
        const newLow = Math.min(newOpen, newClose) - Math.random() * 5;

        const newCandle = {
          open: newOpen,
          close: newClose,
          high: newHigh,
          low: newLow,
        };

        const updated = [...prev, newCandle];
        // Keep last 30 candles
        return updated.length > 20
          ? updated.slice(updated.length - 20)
          : updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const priceToY = price =>
    ((maxPrice - price) / (maxPrice - minPrice)) * height;

  const currentPrice = data[data.length - 1]?.close ?? 0;
  const midPriceY = height / 2;
  const ySteps = 4;
  const priceStep = (maxPrice - minPrice) / ySteps;
  const spacing = (chartWidth - candleOffsetX) / data.length;

  return (
    <View style={{backgroundColor: 'transparent', padding: 10}}>
      <ScrollView horizontal>
        <Svg
          height={height}
          width={labelWidth + labelPadding + data.length * spacing}>
          {[...Array(ySteps + 1)].map((_, i) => {
            const price = minPrice + i * priceStep;
            const y = priceToY(price);
            const isDashed = i === 2;
            return (
              <React.Fragment key={i}>
                <Line
                  x1={0}
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  stroke="transparent"
                  strokeWidth="0.5"
                  strokeDasharray={isDashed ? '4 2' : undefined}
                />
                <Text
                  x={chartWidth + labelPadding}
                  y={y}
                  fill="#aaa"
                  fontSize="10"
                  textAnchor="start">
                  {price.toFixed(6)}
                </Text>
              </React.Fragment>
            );
          })}

          <Line
            x1={0}
            x2={chartWidth}
            y1={midPriceY}
            y2={midPriceY}
            stroke={darkMode ? '#FFE4B2' : '#fcbb46'}
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />

          <Rect
            x={chartWidth}
            y={midPriceY - 12}
            rx="12"
            ry="12"
            width={labelWidth}
            height={26}
            fill={darkMode ? '#FFE4B2' : '#fcbb46'}
            zIndex={1}
          />
          <Text
            x={chartWidth + labelPadding + labelWidth / 2 - 10}
            y={midPriceY + 5}
            fontSize="12"
            fill="#000"
            textAnchor="middle"
            fontWeight="bold">
            {currentPrice.toFixed(6)}
          </Text>

          {data.map((item, index) => {
            const x = candleOffsetX + index * spacing;
            const color = item.close >= item.open ? '#D9D4B3' : '#929292';

            const bodyTop = priceToY(Math.max(item.open, item.close));
            const bodyBottom = priceToY(Math.min(item.open, item.close));

            return (
              <React.Fragment key={index}>
                <Line
                  x1={x + candleWidth / 2}
                  x2={x + candleWidth / 2}
                  y1={priceToY(item.high)}
                  y2={priceToY(item.low)}
                  stroke={color}
                  strokeWidth="1.5"
                />
                <Rect
                  x={x + 5}
                  y={bodyTop + 5}
                  width={candleWidth}
                  height={2}
                  fill={color}
                  rx="1.5"
                />
                <Rect
                  x={x - 5}
                  y={bodyTop - 5}
                  width={candleWidth}
                  height={2}
                  fill={color}
                  rx="1.5"
                />
              </React.Fragment>
            );
          })}
        </Svg>
      </ScrollView>
    </View>
  );
};

export default Candlestick;
