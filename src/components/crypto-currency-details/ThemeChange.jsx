import React, {useEffect} from 'react';

const ThemeChange = ({chart}) => {
  const mode = 'dark';
  const themeChangeHandler = async () => {
    if (chart.chart_ready) {
      if (mode === 'dark') {
        chart.setChartThemeMode({
          background: '#E7E089',
          buyColor: '#D9D4B3',
          sellColor: '#929292',
          ext1: '#2F96F0',
          markline_buy: '#E7E089',
          markline_sell: '#f00',
          markline_open: '#E7E089',
          markline_sl: '#E55604',
          markline_tp: '#451952',
        });
      } else {
        chart.setChartThemeMode({
          background: '#fff',
          buyColor: '#00b276',
          sellColor: '#f00',
          ext1: '#fff',
          markline_buy: '#00b276',
          markline_sell: '#f00',
          markline_open: '#000',
          markline_sl: '#E55604',
          markline_tp: '#451952',
        });
      }
    } else {
      setTimeout(themeChangeHandler, 1000);
    }
  };
  useEffect(() => {
    themeChangeHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default React.memo(ThemeChange);
