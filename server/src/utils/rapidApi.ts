/* eslint-disable no-console */
import axios from "axios";
import dayjs from "dayjs";
import { Stocks } from "../models/stocksModel";

const options = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data',
  headers: {
    'X-RapidAPI-Key': 'f8132e822fmshc64ed9a17db06cep168a86jsn69eecf3051ef',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

const updateDatabase = async (symbol: string, name: string) => {
  const stocks = await Stocks.findOne({ key: symbol });

  const lastUpdateDate = dayjs(stocks && stocks.data[0].date);
  const now = dayjs();
  const daysDifference = now.diff(lastUpdateDate, 'days');

  // database is updated from Tuesday to Saturday
  if (daysDifference > 1 && now.day() > 1) {
    console.log(`Requesting data for ${name} from RapidAPI`);

    const response = await axios.request({ ...options, params: { symbol } });

    await Stocks.deleteOne({ key: symbol });
    await Stocks.create({ key: symbol, name, data: response.data.prices });
  }
};

export default () => {
  updateDatabase('TSLA', 'Tesla');
  updateDatabase('AAPL', 'Apple');
  updateDatabase('MSFT', 'Miscrosoft');
  updateDatabase('GOOG', 'Google');
};