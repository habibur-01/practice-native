import {getAuthToken} from './auth';
import api from '../api/index';
import axios from 'axios';

export async function getChartHistory(symbol, from, to, digits, period) {
  try {
    const result = await axios.get(
      `${process.env.API_BASEURL}/getHistory?digits=${digits}&symbol=${symbol}&from=${from}&to=${to}&period=${period}`,
      {
        headers: {
          Authorization: await getAuthToken(),
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
