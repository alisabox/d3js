import mongoose from "mongoose";

const stocksModel = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  data: [{
    date: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    adjclose: Number,
  }],
});

stocksModel.pre('save', function (next) {
  for (const item of this.data) {
    if (item.date) {
      item.date = new Date(item.date as unknown as number * 1000);
    }
  }

  next();
});

export const Stocks = mongoose.model("Stocks", stocksModel);
