import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import Svg, {Line, Rect, Text} from 'react-native-svg';

const Candlestick = () => {
  const width = Dimensions.get('window').width;
  const height = 150;
  const data = [
    {open: 50, high: 80, low: 40, close: 70},
    {open: 70, high: 90, low: 60, close: 65},
    {open: 65, high: 85, low: 55, close: 75},
    {open: 75, high: 85, low: 65, close: 60},
    {open: 60, high: 70, low: 50, close: 68},
    {open: 68, high: 72, low: 58, close: 62},
    {open: 62, high: 74, low: 60, close: 66},
    {open: 58, high: 70, low: 55, close: 67},
    {open: 67, high: 75, low: 60, close: 62},
    {open: 65, high: 85, low: 55, close: 75},
    {open: 60, high: 70, low: 50, close: 68},
    {open: 68, high: 72, low: 58, close: 62},
    {open: 62, high: 74, low: 60, close: 66},
    {open: 58, high: 70, low: 55, close: 67},
    {open: 67, high: 75, low: 60, close: 62},
    {open: 65, high: 85, low: 55, close: 75},
  ];

  const candleWidth = 8;
  const labelWidth = 60;
  const labelPadding = 10;
  const candleOffsetX = 10; // space before the first candle

  // Calculate chart width after accounting for the label space
  const chartWidth = width - labelWidth - labelPadding - 20;
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));

  // Adjusting the priceToY function to correctly map prices to y values
  const priceToY = price =>
    ((maxPrice - price) / (maxPrice - minPrice)) * height;

  const currentPrice = 4.135802;
  const midPriceY = height / 2;

  const ySteps = 4;
  const priceStep = (maxPrice - minPrice) / ySteps;

  // Calculate dynamic spacing based on the number of candles
  const spacing = (chartWidth - candleOffsetX) / data.length;

  return (
    <View style={{backgroundColor: 'transparent', padding: 10}}>
      <ScrollView horizontal>
        <Svg
          height={height}
          width={labelWidth + labelPadding + data.length * spacing}>
          {/* Grid lines + Y labels (right side) */}
          {[...Array(ySteps + 1)].map((_, i) => {
            const price = minPrice + i * priceStep;
            const y = priceToY(price);
            const isDashed = i === 2; // Make the 3rd grid line (index 2) dashed
            return (
              <React.Fragment key={i}>
                <Line
                  x1={0}
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  stroke="transparent"
                  strokeWidth="0.5"
                  strokeDasharray={isDashed ? '4 2' : undefined} // Dashed for 3rd line
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

          {/* Dotted mid-line */}
          <Line
            x1={0}
            x2={chartWidth}
            y1={midPriceY}
            y2={midPriceY}
            stroke="#ccc"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* Tooltip on the right */}
          <Rect
            x={chartWidth}
            y={midPriceY - 12}
            rx="10"
            ry="10"
            width={labelWidth}
            height={24}
            fill="#FCE6A4"
            zIndex={1}
          />
          <Text
            x={chartWidth + labelPadding + labelWidth / 2 - 5}
            y={midPriceY + 5}
            fontSize="10"
            fill="#000"
            textAnchor="middle"
            fontWeight="bold">
            {currentPrice.toFixed(6)}
          </Text>

          {/* Candlesticks */}
          {data.map((item, index) => {
            const x = candleOffsetX + index * spacing;
            const color = item.close >= item.open ? '#E7E089' : '#888';
            const bodyTop = priceToY(Math.max(item.open, item.close));
            const bodyBottom = priceToY(Math.min(item.open, item.close));
            const bodyHeight = Math.abs(bodyBottom - bodyTop);

            return (
              <React.Fragment key={index}>
                {/* Wick */}
                <Line
                  x1={x + candleWidth / 2}
                  x2={x + candleWidth / 2}
                  y1={priceToY(item.high)}
                  y2={priceToY(item.low)}
                  stroke={color}
                  strokeWidth="1.5"
                />

                {/* Body */}
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
