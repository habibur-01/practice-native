import * as echarts from 'echarts';
import moment from 'moment';
import {Sleep} from 'smn-utils';
import {
  ADX,
  BollingerBands,
  CCI,
  EMA,
  MACD,
  ROC,
  RSI,
  SMA,
  Stochastic,
} from 'technicalindicators';
import {findPrevClosestDateTime} from '../../helpers/dateTime';
import priceManager from '../../helpers/priceManager';

import {getChartHistory} from '../../server/chart';
import {getStaticSymbol} from '../../helpers/symbols';
import store from '../../redux/store';
import {setChartLoading} from '../../redux/features/chart/chartSlice';
class ItcChartService {
  chart_ready = false;
  symbol = null;
  hour = 4;
  // hour = 5;
  chartRef = null;
  buy_price = 0;
  sell_price = 0;
  last_time = null;
  last_sec = null;
  last_timestamp = null;
  dates = [];
  candlestickData = [];
  lineData = [];
  // zoomLevel = 50;
  zoomLevel = 92;
  chartType = 'candlestick';
  backgroundColor;
  color;
  color0;
  color1;
  interval = 60;
  period = 1;
  setChartOptions;
  markline_buy;
  markline_sell;
  markline_open;
  markline_sl;
  markline_tp;
  buyColor;
  sellColor;

  buy_image =
    'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAhZQTFRFAAAAMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMaeIMqiIMqmJMqmJMqmJMaeHJ4ZsK5F2MqmJMqmJJoFpDzcsE0Q3K5J2MqmJMqmJMqmJLJZ6Fk4/DTAmDTEnHGJPMKOEMqmJMqmJMqmJHGBNDjMoEDsvJoBoMqmJMqmJMqmJJX9nET0wL6CCMqmJMqmJKYxxE0U3IG5ZMqmJMqmJGlpIDjQpHWRQF1FBETwwKYpwMqmJMqmJGVdGDjIoMaWGLpt+Fk0+FUo8LZh7FUs8K5F1JHxkDzgsDjMpHGFOMqmJJX5mKIhuMKGCHWNPDzUqLpx+MqmJMqmJMqmJMaWFEkAzMaSFEkI1MqmJMqmJI3liG19NLZp8InReFEg6JX1lMqmJMqmJMKKEKpB0MqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJMqmJzUF+4gAAALJ0Uk5TAAIts+P8/7IrAUnKyEUhwrwbo/79l9zP+PD59vTz8vHu7ezr6ejm5PXW05+aH8EAxUS04a8oU6e1ZhOJtjUG2VIl//9HBID///8j4v////+SkPv////////RLMv/////bgP6////rBD////JEv///////98H/////////////////8f///////+wePf/////ZdD///////8ihf//ghcaJjNe5WMghqYLYeC+exFIi8B/QSFJIZwAAAIqSURBVHic7dbXUxRBEAfgBu4GDkUQD0WOJJ6sCgIenhFFUEEUzH2SFMwZzFkBCYoKKOYAZkTE9B+6N7tTJfhyxXa/ze9lZ6dqv5rt2dlqAB0dHR0dHb5ERce43II0bldsnAfAEz+N1rUyPQFgRiKHLETSTEiexUN7U2A2jyzEHEjloucClyy8fHQaH53KR/v46HQ+OoOPzuSjs/hoxiOTzUfP46Nz+Oj5fLSfj17AR+fy0QYnvZCLzoBFXPRiyONqFvJhSQEPbbY4hTyNWdFS2U4GDOp2snhZ0BNxO7t8hSGf8q1ctZq0UQ6u8XvVkrJL1q4jlGMmvG/pejI5OmdSLX0pRHJZQJHlG+xB+sZNJHSFkis3V6lh0RYKOWGr8qprtm1X4x0U9M5dtrZ7D4b21to3dfUEdINaaOM+xP1NaiebncsHDtpbeAjDOXzEto86p4/Z1PETiDXmuk/aJTnlnD5tSbVnEFtaz4bw3Hlr4oJz+qL1P790GbHxytVriNdvyAnDOV0oj2JVC+LNW0LcbsP2Dnlw6pzTcCcMdSKGukyyuwfx7r3wTC8Bff+BCT3sa2+Vdejvw4F+85r5iICufxwmB588tbbv2fMX8gN5SUDDK/n/UMfw9RtZ6rcUMgwli//SO0xCe94VT24o/O+jSGiADx8nysYnItjM5y9p/8gjQToZ4OtoiUtWxf1t7PtQxI1AZBn/8TPwK5D/+884raujo6OjozOV/AXVTpne09/E7gAAAABJRU5ErkJggg==';
  sell_image =
    'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAhNQTFRFAAAA1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVpzSZmviZh1iVp1iVp1iVp1SVpTS08Ii8tjylRjClQUiw91iVp1iVp1iVppShZEzAoDjAmLC4wxSZjwiZiKi4wDTAmFDAoqSda1iVp1iVp1iVpiilQcytIyyZlbCtG1iVp1CVpQC03DzAncitI1CVo0yVoaytFRS05qChaMi4yJi8vlSlTNy40rSdc1iVp1iVpgSpNEjAoNS4zLS8xFjApiSlP1iVp0CVngCpMjSlR1iVp1iVpySZlMS4yPC021iVplilUKy4woyhY1iVp1iVpkylTGS8qIy8toShX1iVp1iVp1iVpyiZleipKiClPzyVn1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVp1iVpHQ+T6AAAALF0Uk5TAAQhN0AJRX7C7f/BfUIHClDi4EkfjebkhhkCrPn3oQAOh3brrf//m2Tx////////TqP+//////////////yL0/////+5///////////////////0+v///////+H////evf///7j///8s1f/////PJYz//////YMz2tEv7gF3alvHb8j1vmEqRl1gdICElI6FpOrbwKCps7C3v3IVBh77uhpM8+enSwMg2D8FF7aTgnNWOrymYwAAAk5JREFUeJzt1/lTkkEYwPFFRWXFFCtDUyoDKSWKt7DcArrM1LJDs8NKui3L7MA8CC27lA5KSrG0srvM+hPb96oXdEbHeXacZvb7A+++78BnXpb3AiEej8f7z9MlJaekJCfpwGF9alq6AWNDhjFzASiclW3Cf8tZqIeTFy3OxZqWmPOg5PylBTiuQssyGHn5CjyloiwQOnvlVNqUCSHrraJlK1bVYpv4as8HoFetplJJqWONLDsda8VF7joA2iVQaf0Gd9lGkdxUTjZvoUuPF4D2ieJWQsg2OhPbd9CBU9yyE4CWDryKXW5SubuquoYu9pRIJw4ALUhTvLeWkH37nQ5CDhyUNtQB0PXyz3eogZDDRwg5ekxeLwCgG2Xq+AkidbJaXm8CoP3K8XzqtJuQyjM2ZfUsAO31KNg5OtHnLygrHjMA3XxRPQ8vtVy+oo5brwLQujZB4a5dv3FTGQbaIU50dKtD3dWqCnXU2QwhI9RVl3jh64aYDrHg7cZ4uSMEdCug093j08q9EFe9f/idu8pNrO/e/dl/LPjg4aN+TaEBY1jtcduTp9LgWSTDVEjvis9fDLqiUpaXr4aiSi7rcEyT3zXyOkjlN6m+hLsqRPZR+lXNY/Aw7e079D6HiYzHi1CEjYzxIDKwortRgBUdQKxkjDnN6fmiBb7XCXGa0zPQwszvmVtjaJwV/QH1sqI/orQ+NnLTJzQaYyLXhz8j9MUCDwe+fvsuPqj+GIj4Y/FNWCPR6bL/9E6Gp8n4K6R91u3/DfR/hMfj8Xg83rz3Bz2CDVA0ZZ98AAAAAElFTkSuQmCC';
  openOrderPrices = [];

  open_price_markline = 100000;
  sl_markline = 100000;
  tp_markline = 100000;
  high = 0;
  low = 0;
  close = 0;
  open = 0;
  timestamp;
  intervalId;

  // indicators
  chartIndicator = [];

  constructor() {
    this.pullChartData = this.pullChartData.bind(this);
    this.cheakMarketDisable();
  }

  init(chart, setChartOptions, currency, chartType) {
    this.chartRef = chart;
    this.symbol = currency;
    this.setChartOptions = setChartOptions;
    this.chartType = chartType === 'area' ? 'line' : chartType;
    this.setChartInitialData();
    // setTimeout(() => {
    //   store.dispatch(setChartLoading(false));
    // }, 5000);
    // if (chartHistory) {
    this.getChartInitialHistory();
    // s
  }

  // Chart period change
  async changePeriod(period) {
    try {
      this.period = period;
      // this.reloadChart();
      this.reset();
      this.getChartInitialHistory();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ changePeriod ~ error:',
        error.message,
      );
    }
  }

  pulChartDataHandler() {
    this.intervalId = setInterval(() => {
      this.pullChartData();
    }, 1000);
  }

  cheakMarketDisable() {
    try {
      const nowDay = new Date().getDay();
      const marketDisable = nowDay === 6 || nowDay === 0;
      const now_hour = new Date().getHours();
      const marketDisableExtra = nowDay === 1 && now_hour <= this.hour;
      if (marketDisable || marketDisableExtra) {
        if (nowDay === 6) this.hour = this.hour + now_hour;
        else if (nowDay === 0) this.hour = this.hour + now_hour + 24;
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ cheakMarketDisable ~ error:',
        error.message,
      );
    }
  }

  setChartInitialData() {
    try {
      const chartOptions = {
        animation: false,
        renderer: 'canvas',
        // backgroundColor: this.backgroundColor,
        xAxis: [
          {
            type: 'category',
            data: this.dates,
            gridIndex: 0,
            axisLine: {
              lineStyle: {
                width: 0,
              },
            },
            axisLabel: {
              margin: 8,
              padding: [0, 0, 0, 0],
              fontSize: '9px',
              color: '#e3e3e3',
            },
            axisPointer: {
              show: true,
              lineStyle: {
                color: '#d7dce0',
                type: 'solid',
              },
              label: {
                shadowBlur: 0,
                margin: 0,
                backgroundColor: '#4f576d',
                color: '#f7f8f9',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#d7dce0',
                type: 'solid',
                width: 0,
                opacity: 0.1,
              },
            },
          },
          {
            gridIndex: 0,
            show: false,
            type: 'category',
            data: this.dates,
            nameGap: 0,
            axisLabel: {
              margin: 0,
              show: false,
              fontSize: '18px',
              color: '#abafb3',
            },
            axisPointer: {
              show: false,
              lineStyle: {
                color: '#d7dce0',
                type: 'solid',
              },
              label: {
                shadowBlur: 0,
                margin: 0,
                backgroundColor: '#4f576d',
                color: '#f7f8f9',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#d7dce0',
                type: 'solid',
              },
            },
          },
        ],
        yAxis: [
          {
            scale: true,
            gridIndex: 0,
            position: 'right',
            boundaryGap: [0, 0],
            triggerEvent: true,
            nameGap: 100,
            splitNumber: 10,
            axisLabel: {
              margin: 12,
              inside: false,
              fontSize: '10px',
              color: '#abafb3',
            },
            axisTick: {
              show: false,
              length: 7,
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              show: true,
              lineStyle: {
                color: '#d7dce0',
                type: 'solid',
              },
              label: {
                shadowBlur: 0,
                margin: 0,
                backgroundColor: '#4f576d',
                color: '#f7f8f9',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#d7dce0',
                // type: "dashed",
                type: 'solid',
                width: 0,
                opacity: 0.1,
              },
            },
          },
          {
            scale: true,
            gridIndex: 0,
            position: 'left',
            boundaryGap: ['0%', '70%'],
            triggerEvent: true,
            nameGap: 0,
            show: false,
            axisTick: {show: false},
            axisLine: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            axisPointer: {show: false},
          },
        ],
        grid: [
          {
            borderWidth: 0,
            show: true,
            left: '0',
            right: '10px',
            top: '0',
            bottom: '0',
            containLabel: true,
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 0],
            start: this.zoomLevel,
            end: 100,
            zoomLock: true,
          },
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: this.zoomLevel,
            end: 100,
            zoomLock: true,
          },
        ],
        progressive: 100,
        series: [
          {
            type: 'candlestick',
            data: [],
            xAxisIndex: 0,
            yAxisIndex: 0,
            animation: false,
            large: true,
            progressive: 50000,
            animationDuration: 500,
            itemStyle: {
              opacity: this.chartType === 'candlestick' ? 1 : 0,
            },
            markPoint: {
              name: 'markpoint_candleStick',
              tooltip: {
                show: false,
              },
              data: [],
              symbolSize: 40,
              label: {
                show: true,
                color: '#fff',
                fontSize: 9,
              },
            },
            markLine: {
              symbol: ['none', 'none'],
              precision: 5,
              data: [
                {
                  name: 'Current price Buy',
                  yAxis: this.buy_price,
                  symbol: ['none', 'none'],
                  symbolSize: [0, 0],
                },
                {
                  name: 'Current price Sell',
                  yAxis: this.sell_price,
                  symbol: ['none', 'none'],
                  symbolSize: [0, 0],
                },
                {
                  name: 'Open Order',
                  yAxis: this.open_price_markline,
                  symbol: ['none', 'none'],
                  symbolSize: [0, 0],
                },
                {
                  name: 'SL',
                  yAxis: this.sl_markline,
                  symbol: ['none', 'none'],
                  symbolSize: [0, 0],
                },
                {
                  name: 'TP',
                  yAxis: this.tp_markline,
                  symbol: ['none', 'none'],
                  symbolSize: [0, 0],
                },
              ],
              lineStyle: {
                width: 1,
                type: 'solid',
              },
              label: {
                show: true,
                width: 80,
                fontWeight: 'normal',
                fontSize: '10px',
                padding: [4, 0, 4, 0],
                opacity: 1,
                borderWidth: 0,
                borderRadius: 5,
              },
            },
          },
          {
            type: 'line',
            data: [],
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbolSize: 0,
            lineStyle: {
              color: '#29c359',
              opacity: this.chartType === 'line' ? 1 : 0,
            },
            areaStyle: {
              opacity: this.chartType === 'line' ? 1 : 0,
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(41, 195, 89, 0.25)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(41, 195, 89, 0)',
                  },
                ],
                false,
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            },
          },
          {
            name: 'Volume',
            type: 'bar',
            data: [],
            itemStyle: {
              opacity: 0.2,
            },
            yAxisIndex: 1,
            xAxisIndex: 1,
          },
        ],
      };
      this.setChartOptions(chartOptions);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ setChartInitialData ~ error:',
        error.message,
      );
    }
  }

  // Dates Format
  getFormateDates(timestamp) {
    try {
      return moment(timestamp * 1000).format('DD/MM/YYYY HH:mm:ss');
      // return moment(timestamp).utc().format('DD/MM/YYYY HH:mm:ss');
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ getFormateDates ~ error:',
        error.message,
      );
    }
  }

  // Reset Chart Data
  async reloadChart() {
    try {
      if (!this.chartRef?.current) return;
      let options = {
        backgroundColor: this.background,
        xAxis: [
          {
            data: this.dates,
          },
        ],
        series: [
          {
            data: this.candlestickData,
            markPoint: {
              data: this.openOrderPrices.map((item, i) => ({
                symbol: item.type === 'buy' ? this.buy_image : this.sell_image,
                xAxis: item.date,
                yAxis: item.price,
                value: item.amount,
                label: {
                  position: item.type === 'buy' ? 'top' : 'bottom',
                  offset: [0, item.type === 'buy' ? 25 : -25],
                },
              })),
            },
            markLine: {
              data: [
                {
                  yAxis: this.buy_price,
                  label: {
                    color: '#fff',
                    backgroundColor: this.markline_buy,
                    position: 'insideMiddle',
                    width: 50,
                    padding: [2, 4, 4, 10],
                  },
                  lineStyle: {
                    color: this.markline_buy,
                  },
                },
                {
                  yAxis: this.sell_price,
                  label: {
                    color: '#fff',
                    backgroundColor: this.markline_sell,
                    position: 'insideMiddle',
                    width: 50,
                    padding: [2, 4, 4, 10],
                  },
                  lineStyle: {
                    color: this.markline_sell,
                  },
                },
                {
                  yAxis: this.open_price_markline,
                  label: {
                    color: '#fff',
                    backgroundColor: this.markline_open,
                    position: 'insideStart',
                    width: 50,
                    padding: [2, 4, 4, 10],
                  },
                  lineStyle: {
                    color: this.markline_open,
                  },
                },
                {
                  yAxis: this.sl_markline,
                  label: {
                    color: '#fff',
                    backgroundColor: this.markline_sl,
                    position: 'insideEnd',
                    width: 50,
                    padding: [2, 4, 4, 10],
                  },
                  lineStyle: {
                    color: this.markline_sl,
                  },
                },
                {
                  yAxis: this.tp_markline,
                  label: {
                    color: '#fff',
                    backgroundColor: this.markline_tp,
                    position: 'insideEnd',
                    width: 50,
                    padding: [2, 4, 4, 10],
                  },
                  lineStyle: {
                    color: this.markline_tp,
                  },
                },
              ],
            },
            itemStyle: {
              color: this.buyColor,
              color0: this.sellColor,
              borderColor: this.buyColor,
              borderColor0: this.sellColor,
            },
          },
          {
            data: this.lineData,
          },
        ],
      };

      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ reloadChart ~ error:', error.message);
    }
  }

  newMarkLine(value, type) {
    try {
      if (type === 'open_price') {
        this.open_price_markline = value;
      } else if (type === 'sl') {
        this.sl_markline = value;
      } else if (type === 'tp') {
        this.tp_markline = value;
      }
      this.reloadChart();
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ newMarkLine ~ error:', error.message);
    }
  }

  addMarkPoint({id, price, amount, timestamp, type}) {
    try {
      const findDate = findPrevClosestDateTime(
        this.dates,
        timestamp,
        this.interval,
      );

      this.openOrderPrices.push({
        id,
        amount,
        price,
        date: findDate,
        type,
      });
      this.reloadChart();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ addMarkPoint ~ error:',
        error.message,
      );
    }
  }

  removeMarkPoint(id) {
    try {
      this.openOrderPrices = this.openOrderPrices.filter(
        item => item.id !== id,
      );
      this.reloadChart();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ removeMarkPoint ~ error:',
        error.message,
      );
    }
  }

  //Get Initial history
  async getChartInitialHistory() {
    try {
      let symbol = this.symbol;
      let from = Math.floor(
        moment().utc().subtract(this.hour, 'hours').valueOf() / 1000,
      );
      let to = Math.floor(moment().utc().valueOf() / 1000);
      let period = this.period;
      let digits = getStaticSymbol(this.symbol)?.digits;
      let dif = Math.abs(from - to);
      let new_from = dif * period;
      const result = await getChartHistory(
        symbol,
        Math.abs(to - new_from),
        to,
        digits,
        period,
      );

      if (!result?.data?.error && result?.data?.data) {
        // Added the data to market watch for pip calculetion
        const data = result?.data?.data?.filter(
          i => i.close !== 0 && i.open !== 0,
        );
        this.getIntervalWiseHistory(typeof data === 'object' ? data : []).then(
          () => {
            this.chart_ready = true;
            this.seriesReloadChart([500, 1000, 2000, 4000]);
            // store.dispatch(setChartLoading(false));
          },
        );
        this.last_timestamp = data[0]?.timestamp;
        this.setDataStartZoomOption(90);
        // pull chart Dtaa
        // this.pulChartDataHandler();
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ getChartInitialHistory ~ error:',
        error.message,
      );
    }
  }

  seriesReloadChart(time = []) {
    time.forEach(i => {
      setTimeout(() => {
        this.reloadChart();
      }, i);
    });
  }

  //Get previous history
  async getPreviousHistory(initial = false) {
    try {
      const result = await getChartHistory({
        symbol: 'EURUSD',
        to:
          initial || !this.last_timestamp
            ? moment.utc().valueOf()
            : this.last_timestamp,
        from:
          this.last_timestamp ??
          moment(this.last_timestamp).subtract(this.hour, 'hours').valueOf(),
        interval: this.interval,
      });

      if (!result?.data?.error && result?.data?.data) {
        const dates = [];
        const candlestickData = [];
        const lineData = [];
        let timestamp = null;
        let high = 0;
        let low = 0;
        let close = 0;
        let open = 0;

        if (typeof result.data?.data === 'string') return;

        result.data?.data?.forEach(item => {
          if (item.timestamp === timestamp) {
            candlestickData.splice(-1);
            dates.splice(-1);
            lineData.splice(-1);
            high = Math.max(high, item.high);
            low = Math.min(low, item.low);
            close = item.close;
          } else {
            timestamp = item.timestamp;
            open = item.open;
            high = item.high;
            low = item.low;
            close = item.close;
          }
          dates.push(this.getFormateDates(timestamp));
          candlestickData.push([open, close, low, high]);
          lineData.push(close);
        });

        this.dates.unshift(...dates);
        this.candlestickData.unshift(...candlestickData);
        this.lineData.unshift(...lineData);
        this.buy_price = open;
        this.sell_price = close;
        this.reloadChart();
        this.last_timestamp = result.data.data[0]?.timestamp;
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ getPreviousHistory ~ error:',
        error.message,
      );
    }
  }

  // Load history with interval wise
  async getIntervalWiseHistory(chart_data) {
    try {
      // Initial History
      let high = 0;
      let low = 0;
      let close = 0;
      let open = 0;
      let timestamp = null;
      for (const item of chart_data) {
        if (item.open === 0 || item.close === 0) continue;
        if (item.timestamp === timestamp) {
          this.candlestickData.splice(-1);
          this.dates.splice(-1);
          this.lineData.splice(-1);
          high = Math.max(high, item.high);
          low = Math.min(low, item.low);
          close = item.close;
        } else {
          timestamp = item.timestamp;
          open = item.open;
          high = item.high;
          low = item.low;
          close = item.close;
        }
        this.dates.push(this.getFormateDates(timestamp));
        this.candlestickData.push([open, close, low, high]);
        this.lineData.push(close);
        this.buy_price = open;
        this.sell_price = close;
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ getIntervalWiseHistory ~ error:',
        error.message,
      );
    }
  }

  // Websocket Operation per second
  async pullChartData(data) {
    try {
      if (
        typeof data !== 'object' ||
        !data?.bid ||
        !data?.ask ||
        !data?.high ||
        !data?.low ||
        !data.timestamp
      ) {
        return;
      }

      const timestamp = data.timestamp;
      const now = new Date(timestamp * 1000);
      const open = data.bid;
      const close = data.ask;
      if (now.getSeconds() !== this.last_sec) {
        const low = data.bid;
        const high = data.ask;
        if (this.last_time === now.getMinutes()) {
          this.candlestickData.splice(-1);
          this.dates.splice(-1);
          this.lineData.splice(-1);
          this.high = Math.max(this.high, high);
          this.low = Math.min(this.low, low);
          this.close = close;
        } else {
          this.timestamp = timestamp;
          this.open = open;
          this.high = high;
          this.low = low;
          this.close = close;
          this.last_time = now.getMinutes();
          // update Indicators
          await this.updateGraphIndicator();
        }

        this.dates.push(this.getFormateDates(this.timestamp));
        this.candlestickData.push([this.open, this.close, this.low, this.high]);
        this.lineData.push(this.close);
        this.buy_price = open;
        this.sell_price = close;
        this.last_sec = now.getSeconds();
      }
      this.reloadChart();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ pullChartData ~ error:',
        error.message,
      );
    }
  }

  // reset temp data
  reset() {
    try {
      clearInterval(this.intervalId);
      this.dates = [];
      this.candlestickData = [];
      this.lineData = [];

      this.last_time = null;
      this.last_timestamp = null;
      this.timestamp = null;
      this.open = 0;
      this.high = 0;
      this.low = 0;
      this.close = 0;
      this.buy_price = 0;
      this.sell_price = 0;
      this.last_sec = null;

      this.open_price_markline = 100000;
      this.sl_markline = 100000;
      this.tp_markline = 100000;
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ reset ~ error:', error.message);
    }
  }

  // Change chart type
  async changeChartType(type = 'candlestick') {
    try {
      let options;

      if (type === 'candlestick') {
        options = {
          series: [
            {
              itemStyle: {
                opacity: 1,
              },
            },
            {
              lineStyle: {
                opacity: 0,
              },
              areaStyle: {
                opacity: 0,
              },
            },
          ],
        };
      } else if (type === 'line') {
        options = {
          series: [
            {
              itemStyle: {
                opacity: 0,
              },
            },
            {
              lineStyle: {
                opacity: 1,
              },
              areaStyle: {
                opacity: 1,
                color: 'rgba(41, 195, 89, 0)',
              },
            },
          ],
        };
      } else if (type === 'area') {
        options = {
          series: [
            {
              itemStyle: {
                opacity: 0,
              },
            },
            {
              lineStyle: {
                opacity: 1,
              },
              areaStyle: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(41, 195, 89, 0.25)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(41, 195, 89, 0)',
                    },
                  ],
                  false,
                ),
              },
            },
          ],
        };
      }

      await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ changeChartType ~ error:',
        error.message,
      );
    }
  }

  // candle Size Interval
  candleSizeInterval(interval = 60) {
    try {
      if (this.interval === interval) return;
      // Chart Zoom label Control
      // chart data length / end of level = constant
      switch (interval) {
        case 60:
          this.zoomLevel = 98;
          break;
        case 180:
          this.zoomLevel = 98;
          break;
        case 300:
          this.zoomLevel = 98;
          break;
        case 900:
          this.zoomLevel = 98;
          break;
        case 1800:
          this.zoomLevel = 98;
          break;
        case 3600:
          this.zoomLevel = 98;
          break;
        case 14400:
          this.zoomLevel = 98;
          break;
        case 86400:
          this.zoomLevel = 98;
          break;
        case 604800:
          this.zoomLevel = 98;
          break;
        case 2592000:
          this.zoomLevel = 98;
          break;
        default:
          this.zoomLevel = 80;
          break;
      }
      this.interval = interval;
      this.setDataStartZoomOption(this.zoomLevel);
      this.getChartInitialHistory();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ candleSizeInterval ~ error:',
        error.message,
      );
    }
  }

  // Resize Chart
  resizeHeightChart(height = null) {
    try {
      this.chartRef?.current?.setNewOption({height});
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ resizeHeightChart ~ err:',
        error.message,
      );
    }
  }
  // Resize Chart
  resizeChart(height = null, width = null) {
    try {
      if (height && width) {
        this.chartRef?.current?.setNewOption({height, width});
      } else if (height) {
        this.chartRef?.current?.setNewOption({height});
      } else if (width) {
        this.chartRef?.current?.setNewOption({width});
      }
      this.refreshGridSize();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ resizeHeightChart ~ err:',
        error.message,
      );
    }
  }

  // Resize Chart
  resizeWidthChart(width = null) {
    try {
      this.chartRef?.current?.setNewOption({width});
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ resizeWidthChart ~ err:',
        error.message,
      );
    }
  }

  setDataStartZoomOption(zoomLevel) {
    try {
      this.zoomLevel = zoomLevel;
      this.chartRef.current?.setNewOption({
        dataZoom: [
          {
            start: zoomLevel,
          },
          {
            start: zoomLevel,
          },
        ],
      });
      this.refreshGridSize();
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ setDataStartZoomOption ~ error:',
        error.message,
      );
    }
  }

  async setChartThemeMode({
    background,
    buyColor,
    sellColor,
    markline_buy,
    markline_sell,
    markline_open,
    markline_sl,
    markline_tp,
  }) {
    try {
      this.buyColor = buyColor;
      this.sellColor = sellColor;
      this.backgroundColor = background;
      this.markline_buy = markline_buy;
      this.markline_sell = markline_sell;
      this.markline_open = markline_open;
      this.markline_sl = markline_sl;
      this.markline_tp = markline_tp;
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }

  /*********************** Indicator Start *************************/

  // Indicator Service start from here
  generateIndicatorIndex() {
    try {
      return Math.floor(Math.random() * 1000 + 1);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ generateIndicatorIndex ~ error:',
        error.message,
      );
    }
  }

  // get Series Length
  async getSeriesLength() {
    try {
      const data = await this.getOptions();
      return data['series']?.length;
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ getSeriesLength ~ error:',
        error.message,
      );
    }
  }

  async setOptions(opt) {
    try {
      await this.chartRef.current?.setNewOption(opt);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ setOptions ~ error:', error.message);
    }
  }

  // get Series Length
  async getOptions() {
    try {
      return await this.chartRef.current.getInstance('getOption');
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ getOptions ~ error:', error.message);
    }
  }

  // Create Indicator
  async createIndicator(type, data) {
    try {
      switch (type) {
        case 'EMA':
          return await this.addEMA(data);
        case 'SMA':
          return await this.addSMA(data);
        case 'BBANDS':
          return await this.addBBANDS(data);
        case 'MACD':
          return await this.addMACD(data);
        case 'SO':
          return await this.addSO(data);
        case 'RSI':
          return await this.addRSI(data);
        case 'CCI':
          return await this.addCCI(data);
        case 'ROC':
          return await this.addROC(data);
        case 'ADX':
          return await this.addADX(data);
        default:
          return {};
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ createIndicator ~ error:',
        error.message,
      );
    }
  }

  // Generate  Empty Data
  generateEmptyDataStart(s, end) {
    try {
      let arrayAdded = [];
      for (var i = s; i < end; i++) {
        arrayAdded.push(0);
      }
      return arrayAdded;
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ generateEmptyDataStart ~ error:',
        error.message,
      );
    }
  }

  //   Format Data Graph
  formatDataGraph(data) {
    try {
      if (typeof data !== 'object') return;
      return data.map(d => {
        const valData = parseFloat(d);
        if (valData > 10) return valData.toFixed(2);
        if (valData % 1 !== 0) {
          let decimal = (valData + '').split('.');
          if (decimal.length < 2) return valData;
          if (decimal[1].length > 5) return valData.toFixed(5);
        }
        return valData;
      });
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ formatDataGraph ~ error:',
        error.message,
      );
    }
  }

  // async removeIndicator(indexIndicator, typeIndicator, forcehide = true) {
  //   console.log("🚀 ~ removeIndicator ~ indexIndicator, typeIndicator:", indexIndicator, typeIndicator)
  //   try {
  //     if (!indexIndicator) return;
  //     let dataIndicator = this.chartIndicator[indexIndicator];
  //     let nSeries = 1;
  //     if (typeIndicator === 'BBANDS') nSeries = 3;
  //     if (typeIndicator === 'MACD') nSeries = 3;
  //     if (typeIndicator === 'SO') nSeries = 2;
  //     if (typeIndicator === 'ADX') nSeries = 3;
  //     let options = await this.getOptions();
  //     let copacity = 1;
  //     if (!options.series[dataIndicator.serieIndex])
  //       return setTimeout(
  //         () => this.removeIndicator(indexIndicator, typeIndicator),
  //         500,
  //       );

  //     try {
  //       copacity = options.series[dataIndicator.serieIndex].lineStyle.opacity;
  //     } catch (e) {
  //       copacity = options.series[dataIndicator.serieIndex].itemStyle.opacity;
  //     }

  //     if (forcehide) copacity = 1;

  //     for (
  //       var i = dataIndicator.serieIndex;
  //       i <= dataIndicator.serieIndex + (nSeries - 1);
  //       i++
  //     ) {
  //       if (!options.series[i])
  //         return setTimeout(
  //           () => this.removeIndicator(indexIndicator, typeIndicator),
  //           500,
  //         );
  //       try {
  //         options.series[i].lineStyle.opacity = copacity === 0 ? 1 : 0;
  //         options.series[i].symbolSize = copacity === 0 ? 5 : 0;
  //       } catch (e) {
  //         options.series[i].itemStyle.opacity = copacity === 0 ? 1 : 0;
  //       }
  //     }

  //     if (dataIndicator.gridIndex !== 0) {
  //       options.grid[dataIndicator.gridIndex - 1].show =
  //         copacity === 0 ? true : false;
  //     }
  //     await this.setOptions(options);
  //   } catch (error) {
  //     console.log(
  //       '🚀 ~ ItcChartService ~ removeIndicator ~ error:',
  //       error.message,
  //     );
  //   }
  // }

  async removeIndicator(indexIndicator, typeIndicator, forcehide = true) {
    try {
      if (indexIndicator === undefined || indexIndicator === null) return;

      let dataIndicator = this.chartIndicator[indexIndicator];
      if (!dataIndicator) {
        return;
      }

      let nSeries = ['BBANDS', 'MACD', 'ADX'].includes(typeIndicator)
        ? 3
        : typeIndicator === 'SO'
        ? 2
        : 1;

      let options = await this.getOptions();

      if (!options.series[dataIndicator.serieIndex]) {
        return setTimeout(
          () => this.removeIndicator(indexIndicator, typeIndicator),
          500,
        );
      }

      let copacity = 1;
      try {
        copacity =
          options.series[dataIndicator.serieIndex]?.lineStyle?.opacity ??
          options.series[dataIndicator.serieIndex]?.itemStyle?.opacity;
      } catch (e) {
        console.log('⚠️ Error fetching opacity:', e);
      }

      if (forcehide) copacity = 1;

      for (
        let i = dataIndicator.serieIndex;
        i <= dataIndicator.serieIndex + (nSeries - 1);
        i++
      ) {
        if (!options.series[i]) {
          continue;
        }
        try {
          options.series[i].lineStyle.opacity = copacity === 0 ? 1 : 0;
          options.series[i].symbolSize = copacity === 0 ? 5 : 0;
        } catch (e) {
          options.series[i].itemStyle.opacity = copacity === 0 ? 1 : 0;
        }
      }

      if (dataIndicator.gridIndex !== 0) {
        options.grid[dataIndicator.gridIndex - 1].show = copacity === 0;
      }

      await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ removeIndicator ~ error:',
        error.message,
      );
    }
  }

  async refreshGridSize(reloadchart = true) {
    try {
      let options = await this.getOptions();
      let gridListIndex = [];

      options.grid?.forEach((v, k) => {
        if (options.grid[k].show) gridListIndex.push(k);
        if (k > 0 && !options.grid[k].show) {
          options.grid[k].height = '0%';
          options.grid[k].top = '200%';
        }
      });

      if (gridListIndex.length === 1) {
        options.grid[0].height = '100%';
      } else if (gridListIndex.length === 2) {
        options.grid[0].height = '65%';
        options.grid[gridListIndex[1]].top = '70%';
        options.grid[gridListIndex[1]].height = '30%';
      } else {
        options.grid[0].height = '50%';
        for (var k = 1; k < gridListIndex.length; k++) {
          let heightGrid = 50 / (gridListIndex.length - 1);
          let topPos = 55 + heightGrid * (k - 1);
          options.grid[gridListIndex[k]].height = heightGrid - 5 + '%';
          options.grid[gridListIndex[k]].top = topPos + '%';
        }
      }

      if (reloadchart) await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ refreshGridSize ~ error:',
        error.message,
      );
    }
  }

  // Add Indicator To the Graph
  async addIndicatorGraph(
    data,
    color,
    thickness,
    title,
    gridindex = 0,
    type = 'line',
    fill = null,
  ) {
    try {
      let arrayAdded = this.generateEmptyDataStart(
        data.length,
        this.lineData.length,
      );
      let options = await this.getOptions();

      // Indicator type line
      if (type === 'line') {
        data = this.formatDataGraph(data);
        // Add indicator to graph
        options.series.push({
          name: title,
          type,
          xAxisIndex: gridindex,
          yAxisIndex: gridindex,
          symbolSize: 0,
          data: arrayAdded.concat(data),
          smooth: false,
          lineStyle: {
            color: color,
            width: thickness,
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [],
            animation: false,
          },
          itemStyle: {
            color: color,
          },
          areaStyle: {
            color: color,
            opacity: fill == null ? 0 : 0.6,
          },
        });
      } else if (type === 'bar') {
        // Indicator type bar
        options.series.push({
          name: 'MACD',
          type: 'bar',
          xAxisIndex: gridindex,
          yAxisIndex: gridindex,
          data: arrayAdded.concat(data),
          markLine: {
            data: [],
            animation: false,
          },
          itemStyle: {
            color: color,
            opacity: 1,
          },
        });
      }
      // Reload chart
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }

  // Add Grid
  async addGrid() {
    try {
      let options = await this.getOptions();
      options.grid.push({
        left: '0px',
        right: '10px',
        top: '75%',
        height: '25%',
        containLabel: true,
        borderColor: '#1d2435',
        show: true,
        tooltip: {
          trigger: 'axis',
        },
      });
      // Add xAxis grid
      options.xAxis.push({
        type: 'category',
        data: options.xAxis[0].data,
        gridIndex: options.grid.length - 1,
        axisLabel: {
          padding: [-3, 0, 0, 0],
          margin: 8,
          fontSize: '10px',
          // color: '#a1a1a1',
          color: '#000',
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          show: true,
          lineStyle: {
            // color: '#4a505f',
            color: '#000',
            type: 'solid',
          },
          label: {
            shadowBlur: 0,
            margin: 0,
            backgroundColor: '#4f576d',
            color: '#f7f8f9',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#303745',
            type: 'solid',
          },
        },
      });

      // add yAxis grid
      options.yAxis.push({
        scale: true,
        gridIndex: options.grid.length - 1,
        position: 'right',
        boundaryGap: [0, 0],
        triggerEvent: true,
        nameGap: 100,
        axisLabel: {
          fontSize: '10px',
          // color: '#a1a1a1',
          color: '#000',
          align: 'left',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#3d4554',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#4a505f',
            type: 'solid',
          },
          label: {
            shadowBlur: 0,
            margin: 0,
            backgroundColor: '#4f576d',
            // color: '#f7f8f9',
            color: '#000',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#303745',
            type: 'solid',
          },
        },
      });

      options.dataZoom.push({
        type: 'inside',
        xAxisIndex: [0, options.grid.length],
        startValue: this.lineData.length - 100,
        endValue: this.lineData.length,
      });

      // Reload graph
      await this.setOptions(options);
      await this.refreshGridSize();
      return options.grid.length;
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ addGrid ~ error:', error.message);
    }
  }

  // Update Grid Data
  async updateGridData(gridIndex) {
    try {
      let options = await this.getOptions();
      if (!options.xAxis[gridIndex])
        return setTimeout(() => this.updateGridData, 500);
      options.xAxis[gridIndex].data = this.dates;
      await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ updateGridData ~ error:',
        error.message,
      );
    }
  }

  // Update Indicator
  async updateGraphIndicator() {
    try {
      if (this?.chartIndicator) {
        for (const [k, v] of this.chartIndicator.entries()) {
          if (v) {
            await Sleep(1);
            switch (v.indicator) {
              case 'EMA':
                await this.updateEMA(k);
                break;
              case 'SMA':
                await this.updateSMA(k);
                break;
              case 'BBANDS':
                await this.updateBBANDS(k);
                break;
              case 'MACD':
                await this.updateMACD(k);
                break;
              case 'SO':
                await this.updateSO(k);
                break;
              case 'RSI':
                await this.updateRSI(k);
                break;
              case 'CCI':
                await this.updateCCI(k);
                break;
              case 'ROC':
                await this.updateROC(k);
                break;
              case 'ADX':
                await this.updateADX(k);
                break;
              default:
                break;
            }
          }
        }
      } else {
        this.chartIndicator = [];
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ updateGraphIndicator ~ error:',
        error.message,
      );
    }
  }

  async manualUpdateGraphIndicator(name, data) {
    try {
      switch (name) {
        case 'EMA':
          return await this.updateEMA(data);
        case 'SMA':
          return await this.updateSMA(data);
        case 'BBANDS':
          return await this.updateBBANDS(data);
        case 'MACD':
          return await this.updateMACD(data);
        case 'SO':
          return await this.updateSO(data);
        case 'RSI':
          return await this.updateRSI(data);
        case 'CCI':
          return await this.updateCCI(data);
        case 'ROC':
          return await this.updateROC(data);
        case 'ADX':
          return await this.updateADX(data);
        default:
          return;
      }
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ manualUpdateGraphIndicator ~ error:',
        error.message,
      );
    }
  }

  // Add Indicator LineChart

  async addLineChart(color, value, gridindex, thickness = 2, type = 'solid') {
    try {
      let options = await this.getOptions();
      options.series[gridindex].markLine.data.push({
        yAxis: value,
        symbol: 'circle',
        symbolSize: [0, 0],
        lineStyle: {
          color: color,
          width: thickness,
          type: type,
        },
      });
      await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ addLineChart ~ error:',
        error.message,
      );
    }
  }

  // Ema Indicator
  async addEMA({
    indexIndicator = this.generateIndicatorIndex(),
    period = 14,
    colour = '#c21b26',
    thickness = 1,
    update = false,
  }) {
    try {
      const data = this.lineData;
      if (update) return EMA.calculate({period, values: data});
      this.chartIndicator[indexIndicator] = {
        indicator: 'EMA',
        serieIndex: await this.getSeriesLength(),
        gridIndex: 0,
        parms: {period, colour, thickness},
      };
      await this.addIndicatorGraph(
        EMA.calculate({period, values: data}),
        colour,
        thickness,
        'EMA (' + period + ')',
      );
      return {
        index: indexIndicator,
        title: 'EMA (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  // update Ema
  async updateEMA(indicatorID) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      let dataIndicator = this.chartIndicator[indicatorID];
      if (!dataIndicator) return;
      let valIndicator = await this.addEMA({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        colour: dataIndicator.parms.colour,
        thickness: dataIndicator.parms.thickness,
        update: true,
      });
      valIndicator = this.formatDataGraph(valIndicator);
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.updateEMA(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.length,
          this.lineData.length,
        ).concat(valIndicator);
      // setOptions
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateEMA ~ error:', error.message);
    }
  }
  async changeEMA(indicatorID, {period, thickness, colour}) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      this.chartIndicator[indicatorID].parms.period = parseInt(period);
      this.chartIndicator[indicatorID].parms.thickness = thickness;
      this.chartIndicator[indicatorID].parms.colour = colour;
      let dataIndicator = this.chartIndicator[indicatorID];
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.changeEMA(indicatorID), 500);

      options.series[parseInt(dataIndicator.serieIndex)].lineStyle = {
        color: colour,
        width: thickness,
      };
      options.series[parseInt(dataIndicator.serieIndex)].name =
        'EMA (' + period + ')';
      setTimeout(async () => {
        await this.updateEMA(indicatorID);
      }, 1000);
      // setOption
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeEMA ~ error:', error.message);
    }
  }
  // SMA Indicator
  async addSMA({
    indexIndicator = this.generateIndicatorIndex(),
    period = 14,
    colour = '#da4931',
    thickness = 1,
    update = false,
  }) {
    try {
      const data = this.lineData;
      if (update) return SMA.calculate({period, values: data});
      this.chartIndicator[indexIndicator] = {
        indicator: 'SMA',
        serieIndex: await this.getSeriesLength(),
        gridIndex: 0,
        parms: {period, colour, thickness},
      };
      await this.addIndicatorGraph(
        SMA.calculate({period, values: data}),
        colour,
        thickness,
        'SMA (' + period + ')',
      );
      return {
        index: indexIndicator,
        title: 'SMA (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateSMA(indicatorID) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addSMA({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        colour: dataIndicator.parms.colour,
        thickness: dataIndicator.parms.thickness,
        update: true,
      });
      valIndicator = this.formatDataGraph(valIndicator);
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.updateSMA(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.length,
          this.lineData.length,
        ).concat(valIndicator);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateSMA ~ error:', error.message);
    }
  }
  async changeSMA(indicatorID, {period, thickness, colour}) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      this.chartIndicator[indicatorID].parms.period = parseInt(period);
      this.chartIndicator[indicatorID].parms.thickness = thickness;
      this.chartIndicator[indicatorID].parms.colour = colour;
      let dataIndicator = this.chartIndicator[indicatorID];
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(
          () => this.changeSMA(indicatorID, {period, thickness, colour}),
          200,
        );
      options.series[parseInt(dataIndicator.serieIndex)].lineStyle = {
        color: colour,
        width: thickness,
      };
      options.series[parseInt(dataIndicator.serieIndex)].name =
        'SMA (' + period + ')';
      setTimeout(async () => {
        await this.updateSMA(indicatorID);
      }, 1000);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeSMA ~ error:', error.message);
    }
  }
  // BBANDS Indicator
  async addBBANDS({
    indexIndicator = this.generateIndicatorIndex(),
    period = 20,
    deviation = 2,
    uppercolor = '#5ff347',
    upperthickness = 1,
    middlecolor = '#18dae6',
    middlethickness = 1,
    lowercolor = '#c21b26',
    lowerthickness = 1,
    update = false,
  }) {
    try {
      const data = this.lineData;
      let middle = [],
        upper = [],
        lower = [];
      BollingerBands.calculate({
        period,
        values: data,
        stdDev: deviation,
      })?.forEach(v => {
        middle.push(v.middle);
        upper.push(v.upper);
        lower.push(v.lower);
      });
      if (update) return {middle, upper, lower};
      this.chartIndicator[indexIndicator] = {
        indicator: 'BBANDS',
        serieIndex: await this.getSeriesLength(),
        gridIndex: 0,
        parms: {
          period,
          deviation,
          uppercolor,
          upperthickness,
          middlecolor,
          middlethickness,
          lowercolor,
          lowerthickness,
        },
      };
      await this.addIndicatorGraph(
        upper,
        uppercolor,
        upperthickness,
        'BBANDS Upper (' + period + ', ' + deviation + ')',
      );
      await this.addIndicatorGraph(
        middle,
        middlecolor,
        middlethickness,
        'BBANDS Middle (' + period + ', ' + deviation + ')',
      );
      await this.addIndicatorGraph(
        lower,
        lowercolor,
        lowerthickness,
        'BBANDS Lower (' + period + ', ' + deviation + ')',
      );
      return {
        index: indexIndicator,
        title: 'BBANDS (' + period + ', ' + deviation + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateBBANDS(indicatorID) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addBBANDS({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        deviation: dataIndicator.parms.deviation,
        uppercolor: dataIndicator.parms.uppercolor,
        upperthickness: dataIndicator.parms.upperthickness,
        middlecolor: dataIndicator.parms.middlecolor,
        middlethickness: dataIndicator.parms.middlethickness,
        lowercolor: dataIndicator.parms.lowercolor,
        lowerthickness: dataIndicator.parms.lowerthickness,
        update: true,
      });
      valIndicator.upper = this.formatDataGraph(valIndicator.upper);
      valIndicator.middle = this.formatDataGraph(valIndicator.middle);
      valIndicator.lower = this.formatDataGraph(valIndicator.lower);

      if (
        !options.series[dataIndicator.serieIndex] ||
        !options.series[dataIndicator.serieIndex + 1] ||
        !options.series[dataIndicator.serieIndex + 2]
      )
        return setTimeout(() => this.updateBBANDS(indicatorID), 500);

      options.series[dataIndicator.serieIndex].data =
        this.generateEmptyDataStart(
          valIndicator.upper.length,
          this.lineData.length,
        ).concat(valIndicator.upper);
      options.series[dataIndicator.serieIndex + 1].data =
        this.generateEmptyDataStart(
          valIndicator.middle.length,
          this.lineData.length,
        ).concat(valIndicator.middle);
      options.series[dataIndicator.serieIndex + 2].data =
        this.generateEmptyDataStart(
          valIndicator.lower.length,
          this.lineData.length,
        ).concat(valIndicator.lower);
      await this.setOptions(options);
    } catch (error) {
      console.log(
        '🚀 ~ ItcChartService ~ updateBBANDS ~ error:',
        error.message,
      );
    }
  }
  async changeBBANDS(
    indicatorID,
    {
      period,
      deviation,
      uppercolor,
      upperthickness,
      middlecolor,
      middlethickness,
      lowercolor,
      lowerthickness,
    },
  ) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      this.chartIndicator[indicatorID].parms.deviation = parseInt(deviation);
      this.chartIndicator[indicatorID].parms.lowercolor = lowercolor;
      this.chartIndicator[indicatorID].parms.lowerthickness = lowerthickness;
      this.chartIndicator[indicatorID].parms.thickness = middlethickness;
      this.chartIndicator[indicatorID].parms.middlecolor = middlecolor;
      this.chartIndicator[indicatorID].parms.middlethickness = middlethickness;
      this.chartIndicator[indicatorID].parms.period = parseInt(period);
      this.chartIndicator[indicatorID].parms.upper_colour = uppercolor;
      this.chartIndicator[indicatorID].parms.upperthickness = upperthickness;
      let dataIndicator = this.chartIndicator[indicatorID];
      if (
        !options.series[parseInt(dataIndicator.serieIndex)] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 1] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 2]
      )
        return setTimeout(
          () =>
            this.changeBBANDS(indicatorID, {
              period,
              deviation,
              uppercolor,
              upperthickness,
              middlecolor,
              middlethickness,
              lowercolor,
              lowerthickness,
            }),
          200,
        );
      options.series[parseInt(dataIndicator.serieIndex)].lineStyle = {
        color: uppercolor,
        width: upperthickness,
      };
      options.series[parseInt(dataIndicator.serieIndex)].name =
        'BBANDS Upper (' + period + ', ' + deviation + ')';
      options.series[parseInt(dataIndicator.serieIndex) + 1].lineStyle = {
        color: middlecolor,
        width: middlethickness,
      };
      options.series[parseInt(dataIndicator.serieIndex) + 1].name =
        'BBANDS Middle (' + period + ', ' + deviation + ')';
      options.series[parseInt(dataIndicator.serieIndex) + 2].lineStyle = {
        color: lowercolor,
        width: lowerthickness,
      };
      options.series[parseInt(dataIndicator.serieIndex) + 2].name =
        'BBANDS Lower (' + period + ', ' + deviation + ')';
      await this.updateBBANDS(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  // MACD Indicator
  async addMACD({
    indexIndicator = this.generateIndicatorIndex(),
    fastperiod = 12,
    slowPeriod = 26,
    signalPeriod = 9,
    thickness = 1,
    macd_colour = '#5ff347',
    signal_colour = '#18dae6',
    historgram_up_colour = '#df2323',
    historgram_low_colour = '#29c359',
    update = false,
  }) {
    try {
      const data = this.lineData;
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      let signalData = [],
        macd = [],
        histogram = [];
      MACD.calculate({
        values: data,
        fastPeriod: fastperiod,
        slowPeriod: slowPeriod,
        signalPeriod: signalPeriod,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      })?.forEach(v => {
        signalData.push(v.signal);
        macd.push(v.MACD);
        histogram.push(v.histogram);
      });
      if (update) return {signalData, macd, histogram};
      this.chartIndicator[indexIndicator] = {
        indicator: 'MACD',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {
          fastperiod: fastperiod,
          slowPeriod: slowPeriod,
          signalPeriod: signalPeriod,
          thickness: thickness,
          macd_colour: macd_colour,
          signal_colour: signal_colour,
          historgram_up_colour: historgram_up_colour,
          historgram_low_colour: historgram_low_colour,
        },
      };

      // await this.addIndicatorGraph(
      //   histogram,
      //   function (params) {
      //     if (params.data >= 0) return historgram_up_colour;
      //     return historgram_low_colour;
      //   },
      //   1,
      //   'MACD (' + fastperiod + ', ' + slowPeriod + ', ' + signalPeriod + ')',
      //   gridNum,
      //   'bar',
      // );

      await this.addIndicatorGraph(
        macd,
        macd_colour,
        thickness,
        'DEA (' + fastperiod + ', ' + slowPeriod + ', ' + signalPeriod + ')',
        gridNum,
        'line',
      );

      await this.addIndicatorGraph(
        signalData,
        signal_colour,
        thickness,
        'DIF (' + fastperiod + ', ' + slowPeriod + ', ' + signalPeriod + ')',
        gridNum,
        'line',
      );
      return {
        index: indexIndicator,
        title:
          'MACD (' + fastperiod + ', ' + slowPeriod + ', ' + signalPeriod + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateMACD(indicatorID) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      let dataIndicator = this.chartIndicator[indicatorID];

      let valIndicator = await this.addMACD({
        indicatorID,
        fastperiod: dataIndicator.parms.fastperiod,
        slowPeriod: dataIndicator.parms.slowPeriod,
        signalPeriod: dataIndicator.parms.signalPeriod,
        thickness: dataIndicator.parms.thickness,
        macd_colour: dataIndicator.parms.macd_colour,
        signal_colour: dataIndicator.parms.signal_colour,
        historgram_up_colour: dataIndicator.parms.historgram_up_colour,
        historgram_low_colour: dataIndicator.parms.historgram_low_colour,
        update: true,
      });
      valIndicator.macd = this.formatDataGraph(valIndicator.macd);
      valIndicator.signalData = this.formatDataGraph(valIndicator.signalData);
      if (
        !options.series[parseInt(dataIndicator.serieIndex)] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 1]
      )
        return setTimeout(() => this.updateMACD(indicatorID), 500);
      // options.series[parseInt(dataIndicator.serieIndex)].data =
      //   this.generateEmptyDataStart(
      //     valIndicator.histogram.length,
      //     this.candlestickData.length,
      //   ).concat(valIndicator.histogram);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.macd.length,
          this.candlestickData.length,
        ).concat(valIndicator.macd);
      options.series[parseInt(dataIndicator.serieIndex) + 1].data =
        this.generateEmptyDataStart(
          valIndicator.signalData.length,
          this.candlestickData.length,
        ).concat(valIndicator.signalData);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateMACD ~ error:', error.message);
    }
  }
  async changeMACD(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      let dataIndicator = this.chartIndicator[indicatorID];
      let options = await this.getOptions();
      dataIndicator.parms.fastperiod = parseInt(dataStyle.fastperiod);
      dataIndicator.parms.slowPeriod = parseInt(dataStyle.slowperiod);
      dataIndicator.parms.signalPeriod = parseInt(dataStyle.signalperiod);
      dataIndicator.parms.thickness = dataStyle.thickness;
      dataIndicator.parms.macd_colour = dataStyle.macd_colour;
      dataIndicator.parms.signal_colour = dataStyle.signal_colour;
      if (
        !options.series[dataIndicator.serieIndex + 1] ||
        !options.series[dataIndicator.serieIndex + 2]
      )
        return setTimeout(() => this.changeMACD(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex + 1].lineStyle = {
        color: dataStyle.macd_colour,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex + 1].name =
        'DEA (' +
        dataStyle.fastperiod +
        ', ' +
        dataStyle.slowperiod +
        ', ' +
        dataStyle.signalperiod +
        ')';
      options.series[dataIndicator.serieIndex + 2].lineStyle = {
        color: dataStyle.signal_colour,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex + 2].name =
        'DIF (' +
        dataStyle.fastperiod +
        ', ' +
        dataStyle.slowperiod +
        ', ' +
        dataStyle.signalperiod +
        ')';
      await this.updateMACD(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeMACD ~ error:', error.message);
    }
  }
  async addSO({
    indexIndicator = this.generateIndicatorIndex(),
    kPeriod = 14,
    dPeriod = 3,
    thickness = 1,
    overbuy = 80,
    overbuy_color = '#5ff347',
    oversell = 20,
    oversell_color = '#c21b26',
    kseries_color = '#d0e521',
    dseries_color = '#18dae6',
    update = false,
  }) {
    try {
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      let soArgs = {
        high: [],
        low: [],
        close: [],
        period: kPeriod,
        signalPeriod: dPeriod,
      };
      this.candlestickData?.forEach(v => {
        soArgs['high'].push(v[3]);
        soArgs['low'].push(v[2]);
        soArgs['close'].push(v[1]);
      });
      let k = [],
        d = [];
      Stochastic.calculate(soArgs)?.forEach(vs => {
        k.push(vs.k);
        d.push(vs.d);
      });
      if (update) return {k, d};
      this.chartIndicator[indexIndicator] = {
        indicator: 'SO',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {
          kPeriod: kPeriod,
          dPeriod: dPeriod,
          thickness: thickness,
          overbuy: overbuy,
          overbuy_color: overbuy_color,
          oversell: oversell,
          oversell_color: oversell_color,
          kseries_color: kseries_color,
          dseries_color: dseries_color,
        },
      };

      await this.addIndicatorGraph(
        k,
        kseries_color,
        thickness,
        'SO K (' + kPeriod + ', ' + dPeriod + ')',
        gridNum,
        'line',
      );
      await this.addIndicatorGraph(
        d,
        dseries_color,
        thickness,
        'SO D (' + kPeriod + ', ' + dPeriod + ')',
        gridNum,
        'line',
      );
      await this.addLineChart(
        overbuy_color,
        overbuy,
        (await this.getSeriesLength()) - 1,
      );
      await this.addLineChart(
        oversell_color,
        oversell,
        (await this.getSeriesLength()) - 1,
      );
      return {
        index: indexIndicator,
        title: 'SO (' + kPeriod + ', ' + dPeriod + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateSO(indicatorID) {
    try {
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addSO({
        indexIndicator: indicatorID,
        kPeriod: dataIndicator.parms.kPeriod,
        dPeriod: dataIndicator.parms.dPeriod,
        thickness: dataIndicator.parms.thickness,
        overbuy: dataIndicator.parms.overbuy,
        overbuy_color: dataIndicator.parms.overbuy_color,
        oversell: dataIndicator.parms.oversell,
        oversell_color: dataIndicator.parms.oversell_color,
        kseries_color: dataIndicator.parms.kseries_color,
        dseries_color: dataIndicator.parms.dseries_color,
        update: true,
      });
      valIndicator.d = this.formatDataGraph(valIndicator.d);
      valIndicator.k = this.formatDataGraph(valIndicator.k);
      let options = await this.getOptions();
      if (
        !options.series[parseInt(dataIndicator.serieIndex)] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 1]
      ) {
        return setTimeout(() => this.updateSO(indicatorID), 500);
      }
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.d.length,
          this.candlestickData.length,
        ).concat(valIndicator.d);
      options.series[parseInt(dataIndicator.serieIndex) + 1].data =
        this.generateEmptyDataStart(
          valIndicator.k.length,
          this.candlestickData.length,
        ).concat(valIndicator.k);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateSO ~ error:', error.message);
    }
  }
  async changeSO(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      let options = await this.getOptions();
      let dataIndicator = this.chartIndicator[indicatorID];
      dataIndicator.parms.kPeriod = parseInt(dataStyle.kperiod);
      dataIndicator.parms.dPeriod = parseInt(dataStyle.dperiod);
      dataIndicator.parms.thickness = dataStyle.thickness;
      dataIndicator.parms.overbuy = dataStyle.overbuy_value;
      dataIndicator.parms.overbuy_color = dataStyle.overbuy_color;
      dataIndicator.parms.oversell = dataStyle.oversold_value;
      dataIndicator.parms.oversell_color = dataStyle.oversold_color;
      dataIndicator.parms.kseries_color = dataStyle.kseries_color;
      dataIndicator.parms.dseries_color = dataStyle.dseries_color;
      if (
        !options.series[dataIndicator.serieIndex] ||
        !options.series[dataIndicator.serieIndex + 1]
      )
        return setTimeout(() => this.changeSO(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex].lineStyle = {
        color: dataStyle.dseries_color,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex].name =
        'SO D (' + dataStyle.kperiod + ', ' + dataStyle.dperiod + ')';
      options.series[dataIndicator.serieIndex + 1].lineStyle = {
        color: dataStyle.kseries_color,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex + 1].name =
        'SO K (' + dataStyle.kperiod + ', ' + dataStyle.dperiod + ')';
      options.series[
        dataIndicator.serieIndex + 1
      ].markLine.data[0].lineStyle.color = dataStyle.overbuy_color;
      options.series[dataIndicator.serieIndex + 1].markLine.data[0].yAxis =
        dataStyle.overbuy_value;
      options.series[
        dataIndicator.serieIndex + 1
      ].markLine.data[1].lineStyle.color = dataStyle.oversold_color;
      options.series[dataIndicator.serieIndex + 1].markLine.data[1].yAxis =
        dataStyle.oversold_value;
      await this.updateSO(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeSO ~ error:', error.message);
    }
  }
  async addRSI({
    indexIndicator = this.generateIndicatorIndex(),
    period = 14,
    color = '#18dae6',
    thickness = 1,
    over = 70,
    over_color = '#5ff347',
    under = 30,
    under_color = '#c21b26',
    update = false,
  }) {
    try {
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      if (update) return RSI.calculate({values: this.lineData, period});
      this.chartIndicator[indexIndicator] = {
        indicator: 'RSI',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {period, color, thickness, over, over_color, under, under_color},
      };
      await this.addIndicatorGraph(
        RSI.calculate({values: this.lineData, period}),
        color,
        thickness,
        'RSI (' + period + ')',
        gridNum,
        'line',
      );
      await this.addLineChart(
        over_color,
        over,
        (await this.getSeriesLength()) - 1,
      );
      await this.addLineChart(
        under_color,
        under,
        (await this.getSeriesLength()) - 1,
      );
      return {
        index: indexIndicator,
        title: 'RSI (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateRSI(indicatorID) {
    try {
      if (!indicatorID) return;
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addRSI({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        color: dataIndicator.parms.color,
        thickness: dataIndicator.parms.thickness,
        over: dataIndicator.parms.over,
        over_color: dataIndicator.parms.over_color,
        under: dataIndicator.parms.under,
        under_color: dataIndicator.parms.under_color,
        update: true,
      });
      valIndicator = this.formatDataGraph(valIndicator);
      let options = await this.getOptions();
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.updateRSI(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.length,
          this.candlestickData.length,
        ).concat(valIndicator);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateRSI ~ error:', error.message);
    }
  }
  async changeRSI(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      this.chartIndicator[indicatorID].parms.period = parseInt(
        dataStyle.period,
      );
      this.chartIndicator[indicatorID].parms.color = dataStyle.colour;
      this.chartIndicator[indicatorID].parms.thickness = dataStyle.thickness;
      this.chartIndicator[indicatorID].parms.over = dataStyle.over_value;
      this.chartIndicator[indicatorID].parms.over_color = dataStyle.over_color;
      this.chartIndicator[indicatorID].parms.under = dataStyle.under_value;
      this.chartIndicator[indicatorID].parms.under_color =
        dataStyle.under_color;
      let dataIndicator = this.chartIndicator[indicatorID];
      let options = await this.getOptions();
      if (!options.series[dataIndicator.serieIndex])
        return setTimeout(() => this.changeRSI(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex].lineStyle = {
        color: dataStyle.colour,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex].name =
        'RSI (' + dataStyle.period + ')';
      options.series[
        dataIndicator.gridIndex + 1
      ].markLine.data[0].lineStyle.color = dataStyle.over_color;
      options.series[dataIndicator.gridIndex + 1].markLine.data[0].yAxis =
        dataStyle.over_value;
      options.series[
        dataIndicator.serieIndex
      ].markLine.data[1].lineStyle.color = dataStyle.under_color;
      options.series[dataIndicator.serieIndex].markLine.data[1].yAxis =
        dataStyle.under_value;
      await this.updateRSI(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeRSI ~ error:', error.message);
    }
  }
  async addCCI({
    indexIndicator = this.generateIndicatorIndex(),
    period = 14,
    color = '#5ff347',
    thickness = 1,
    color_trend = '#eda129',
    update = false,
  }) {
    try {
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      let cciArgs = {open: [], high: [], low: [], close: [], period: period};
      this.candlestickData?.forEach(v => {
        cciArgs['high'].push(v[3]);
        cciArgs['low'].push(v[2]);
        cciArgs['close'].push(v[1]);
        cciArgs['open'].push(v[0]);
      });
      if (update) return CCI.calculate(cciArgs);
      this.chartIndicator[indexIndicator] = {
        indicator: 'CCI',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {period, color, thickness, color_trend},
      };
      await this.addIndicatorGraph(
        CCI.calculate(cciArgs),
        color,
        thickness,
        'CCI (' + period + ')',
        gridNum,
        'line',
      );
      let options = await this.getOptions();
      await this.addLineChart(
        color_trend,
        100,
        (await this.getSeriesLength()) - 1,
        1,
      );
      await this.addLineChart(
        color_trend,
        -100,
        (await this.getSeriesLength()) - 1,
        1,
      );
      return {
        index: indexIndicator,
        title: 'CCI (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateCCI(indicatorID) {
    try {
      if (!indicatorID) return;
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addCCI({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        color: dataIndicator.parms.color,
        thickness: dataIndicator.parms.thickness,
        color_trend: dataIndicator.parms.color_trend,
        update: true,
      });
      valIndicator = this.formatDataGraph(valIndicator);
      let options = await this.getOptions();
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.updateCCI(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.length,
          this.candlestickData.length,
        ).concat(valIndicator);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateCCI ~ error:', error.message);
    }
  }
  async changeCCI(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      this.chartIndicator[indicatorID].parms.period = parseInt(
        dataStyle.period,
      );
      this.chartIndicator[indicatorID].parms.color = dataStyle.colour;
      this.chartIndicator[indicatorID].parms.thickness = dataStyle.thickness;
      this.chartIndicator[indicatorID].parms.color_trend =
        dataStyle.colour_trend;
      let dataIndicator = this.chartIndicator[indicatorID];
      let options = await this.getOptions();
      if (!options.series[dataIndicator.serieIndex])
        return setTimeout(() => this.changeCCI(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex].lineStyle = {
        color: dataStyle.colour,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex].name =
        'CCI (' + dataStyle.period + ')';
      options.series[
        dataIndicator.gridIndex + 1
      ].markLine.data[0].lineStyle.color = dataStyle.colour_trend;
      options.series[
        dataIndicator.serieIndex
      ].markLine.data[1].lineStyle.color = dataStyle.colour_trend;
      await this.updateCCI(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeCCI ~ error:', error.message);
    }
  }
  async addROC({
    indexIndicator = this.generateIndicatorIndex(),
    period = 12,
    color = '#5ff347',
    thickness = 1,
    update = false,
  }) {
    try {
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      if (update) return ROC.calculate({values: this.lineData, period});
      this.chartIndicator[indexIndicator] = {
        indicator: 'ROC',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {period: period, color: color, thickness: thickness},
      };
      await this.addIndicatorGraph(
        ROC.calculate({values: this.lineData, period}),
        color,
        thickness,
        'ROC (' + period + ')',
        gridNum,
        'line',
      );
      // this.addLineChart("#f5f5f5", 0, await this.getSeriesLength() - 1, 1, "dashed");
      await this.addLineChart(
        '#f5f5f5',
        0,
        (await this.getSeriesLength()) - 1,
        1,
        'solid',
      );
      return {
        index: indexIndicator,
        title: 'ROC (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateROC(indicatorID) {
    try {
      if (!indicatorID) return;
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addROC({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        color: dataIndicator.parms.color,
        thickness: dataIndicator.parms.thickness,
        update: true,
      });
      valIndicator = this.formatDataGraph(valIndicator);
      let options = await this.getOptions();
      if (!options.series[parseInt(dataIndicator.serieIndex)])
        return setTimeout(() => this.updateROC(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.length,
          this.candlestickData.length,
        ).concat(valIndicator);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateROC ~ error:', error.message);
    }
  }
  async changeROC(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      this.chartIndicator[indicatorID].parms.period = parseInt(
        dataStyle.period,
      );
      this.chartIndicator[indicatorID].parms.color = dataStyle.colour;
      this.chartIndicator[indicatorID].parms.thickness = dataStyle.thickness;
      let dataIndicator = this.chartIndicator[indicatorID];
      let options = await this.getOptions();
      if (!options.series[dataIndicator.serieIndex])
        return setTimeout(() => this.changeROC(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex].lineStyle = {
        color: dataStyle.colour,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex].name =
        'ROC (' + dataStyle.period + ')';
      await this.updateROC(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeROC ~ error:', error.message);
    }
  }
  async addADX({
    indexIndicator = this.generateIndicatorIndex(),
    period = 14,
    thickness = 1,
    adxcolor = '#5ff347',
    mdicolor = '#da4931',
    pdicolor = '#c21b26',
    update = false,
  }) {
    try {
      let gridNum = null;
      if (!update) gridNum = await this.addGrid();
      let adxArgs = {high: [], low: [], close: [], period: period};
      this.candlestickData?.forEach(v => {
        adxArgs['high'].push(v[3]);
        adxArgs['low'].push(v[2]);
        adxArgs['close'].push(v[1]);
      });
      let adx = [],
        mdi = [],
        pdi = [];
      ADX.calculate(adxArgs)?.forEach(v => {
        adx.push(v.adx);
        mdi.push(v.mdi);
        pdi.push(v.pdi);
      });
      if (update) return {adx: adx, mdi: mdi, pdi: pdi};
      this.chartIndicator[indexIndicator] = {
        indicator: 'ADX',
        gridIndex: gridNum,
        serieIndex: await this.getSeriesLength(),
        parms: {period, thickness, adxcolor, mdicolor, pdicolor},
      };
      await this.addIndicatorGraph(
        adx,
        adxcolor,
        thickness,
        'ADX (' + period + ')',
        gridNum,
        'line',
      );
      await this.addIndicatorGraph(
        mdi,
        mdicolor,
        thickness,
        'MDI (' + period + ')',
        gridNum,
        'line',
      );
      await this.addIndicatorGraph(
        pdi,
        pdicolor,
        thickness,
        'PDI (' + period + ')',
        gridNum,
        'line',
      );
      return {
        index: indexIndicator,
        title: 'ADX (' + period + ')',
      };
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ error:', error.message);
    }
  }
  async updateADX(indicatorID) {
    try {
      if (!indicatorID) return;
      let dataIndicator = this.chartIndicator[indicatorID];
      let valIndicator = await this.addADX({
        indexIndicator: indicatorID,
        period: dataIndicator.parms.period,
        thickness: dataIndicator.parms.thickness,
        adxcolor: dataIndicator.parms.adxcolor,
        mdicolor: dataIndicator.parms.mdicolor,
        pdicolor: dataIndicator.parms.pdicolor,
        update: true,
      });
      valIndicator.adx = this.formatDataGraph(valIndicator.adx);
      valIndicator.mdi = this.formatDataGraph(valIndicator.mdi);
      valIndicator.pdi = this.formatDataGraph(valIndicator.pdi);
      let options = await this.getOptions();
      if (
        !options.series[parseInt(dataIndicator.serieIndex)] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 1] ||
        !options.series[parseInt(dataIndicator.serieIndex) + 2]
      )
        return setTimeout(() => this.updateADX(indicatorID), 500);
      options.series[parseInt(dataIndicator.serieIndex)].data =
        this.generateEmptyDataStart(
          valIndicator.adx.length,
          this.candlestickData.length,
        ).concat(valIndicator.adx);
      options.series[parseInt(dataIndicator.serieIndex) + 1].data =
        this.generateEmptyDataStart(
          valIndicator.adx.length,
          this.candlestickData.length,
        ).concat(valIndicator.mdi);
      options.series[parseInt(dataIndicator.serieIndex) + 2].data =
        this.generateEmptyDataStart(
          valIndicator.adx.length,
          this.candlestickData.length,
        ).concat(valIndicator.pdi);
      await this.setOptions(options);
      await this.updateGridData(dataIndicator.gridIndex);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ updateADX ~ error:', error.message);
    }
  }
  async changeADX(indicatorID, dataStyle) {
    try {
      if (!indicatorID) return;
      this.chartIndicator[indicatorID].parms.period = parseInt(
        dataStyle.period,
      );
      this.chartIndicator[indicatorID].parms.thickness = dataStyle.thickness;
      this.chartIndicator[indicatorID].parms.adxcolor =
        dataStyle.adxseries_color;
      this.chartIndicator[indicatorID].parms.mdicolor = dataStyle.ndi_color;
      this.chartIndicator[indicatorID].parms.pdicolor = dataStyle.pdi_color;
      let dataIndicator = this.chartIndicator[indicatorID];
      let options = await this.getOptions();
      if (
        !options.series[dataIndicator.serieIndex] ||
        !options.series[dataIndicator.serieIndex + 1] ||
        !options.series[dataIndicator.serieIndex + 2]
      )
        return setTimeout(() => this.changeADX(indicatorID, dataStyle), 500);
      options.series[dataIndicator.serieIndex].lineStyle = {
        color: dataStyle.adxseries_color,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex].name =
        'ADX (' + dataStyle.period + ')';
      options.series[dataIndicator.serieIndex + 1].lineStyle = {
        color: dataStyle.ndi_color,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex + 1].name =
        'MDI (' + dataStyle.period + ')';
      options.series[dataIndicator.serieIndex + 2].lineStyle = {
        color: dataStyle.pdi_color,
        width: dataStyle.thickness,
      };
      options.series[dataIndicator.serieIndex + 2].name =
        'PDI (' + dataStyle.period + ')';
      await this.updateADX(indicatorID);
      await this.setOptions(options);
    } catch (error) {
      console.log('🚀 ~ ItcChartService ~ changeADX ~ error:', error.message);
    }
  }
}

/*********************** Indicator END *************************/

export default ItcChartService;
