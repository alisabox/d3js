import { Stocks } from "../models/stocksModel";
import catchAsync from "../utils/catchAsync";


export const getStocks = catchAsync(async (req, res) => {
  const stocks = await Stocks.find({ key: { $in: req.query.keys } });
  const filteredStocks = stocks.map(item => ({
    key: item.key,
    name: item.name,
    data: item.data.filter(x => !!x.close),
  }));

  res.status(200).json({
    status: 'success',
    results: filteredStocks.length,
    data: filteredStocks,
  });
});