import axios from 'axios';
import {API_BASEURL} from '@env';

export async function getChartHistory(symbol, from, to, digits, period) {
  try {
    const result = await axios.get(
      `${API_BASEURL}/getHistory?digits=${digits}&symbol=${symbol}&from=${from}&to=${to}&period=${period}`,
    );
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
