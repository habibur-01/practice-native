import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import {useSelector} from 'react-redux';
import ItcChartService from '../../services/chart/ItcChartService';
import ThemeChange from './ThemeChange';
import {selectSymbolPrice} from '../../redux/features/price/priceSlice';

const Chart = memo(({currency = 'EURUSD', chartHeight, chartWidth}) => {
  const chartI = useMemo(() => new ItcChartService(), []);
  const chartRef = useRef(null);
  const [chartOptions, setChartOptions] = useState(null);
  const chartType = 'candlestick';
  const loaded = useRef(false);
  const loading = false;
  const price = useSelector(selectSymbolPrice(currency));

  const initChartHandler = () => {
    chartI?.init(chartRef, setChartOptions, currency, chartType);
  };

  useEffect(() => {
    if (!chartI) return;
    chartI?.resizeChart(chartHeight, chartWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartHeight, chartWidth]);

  useEffect(() => {
    initChartHandler();
    return () => {
      chartI?.reset();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    if (!chartI) return;
    if (!price) return;
    chartI?.pullChartData(price);
  }, [price, chartI]);

  return (
    <View
      style={[styles.chartContainer, {height: chartHeight, width: chartWidth}]}>
      {/* <Text style={styles.chartTitle}>{currency || 'EURUSD'}</Text> */}

      <ThemeChange chart={chartI} />
      {loading ? (
        <View
          style={[
            styles.loadingContainer,
            {height: chartHeight, width: chartWidth},
          ]}>
          <ActivityIndicator size="large" color="#00b276" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        chartOptions && (
          <RNEChartsPro
            height={chartHeight}
            width={chartWidth}
            enableParseStringFunction
            webViewSettings={{nestedScrollEnabled: false}}
            eventActions={{
              dataZoom: async ({batch}) => {
                if (Number.parseInt(batch[0].start) < 1 && !loaded.current) {
                  loaded.current = true;
                  setTimeout(() => {
                    loaded.current = false;
                  }, 5000);
                }
              },
            }}
            ref={chartRef}
            option={chartOptions}
          />
        )
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  chartContainer: {
    paddingBottom: 10,
    marginTop: 0,
    zIndex: 1000,
  },
  chartTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  loadingContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Chart;
