import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Rect} from 'react-native-svg';

const Candlestick = ({width = 134, height = 60}) => {
  const data = [
    {open: 50, high: 80, low: 40, close: 70}, // up
    {open: 70, high: 90, low: 60, close: 65}, // down
    {open: 65, high: 85, low: 55, close: 75}, // up
    {open: 75, high: 85, low: 65, close: 60}, // down
    {open: 60, high: 70, low: 50, close: 68}, // up
    {open: 68, high: 72, low: 58, close: 62}, // down
    {open: 62, high: 74, low: 60, close: 66}, // up
    {open: 58, high: 70, low: 55, close: 67}, // up
    {open: 67, high: 75, low: 60, close: 62}, // down
    {open: 65, high: 85, low: 55, close: 75}, // up
  ];

  const candleWidth = 12;
  const spacing = 15;
  const maxPrice = Math.max(...data.flatMap(d => [d.high]));
  const minPrice = Math.min(...data.flatMap(d => [d.low]));

  const priceToY = price => {
    return ((maxPrice - price) / (maxPrice - minPrice)) * height;
  };

  return (
    <View>
      <Svg height={height} width={width}>
        {data.map((item, index) => {
          const x = index * spacing;
          const color = item.close >= item.open ? '#D9D4B3' : '#929292';

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

              {/* Candle body */}
              <Rect
                x={x}
                y={priceToY(Math.max(item.open, item.close))}
                width={candleWidth}
                height={Math.abs(2)}
                fill={color}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default Candlestick;
