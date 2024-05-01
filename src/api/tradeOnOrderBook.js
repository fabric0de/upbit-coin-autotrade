import axios from "axios";
import order from "./orders.js";

const options = {
  url: "https://api.upbit.com/v1/orderbook",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    markets: "KRW-BTC",
  },
};

const tradeBasedOnOrderBook = async () => {
  try {
    const response = await axios(options);
    const orderbook = response.data[0];
    const highestBid = orderbook.orderbook_units[0].bid_price;
    const highestBidSize = orderbook.orderbook_units[0].bid_size;
    const secondHighestBidSize = orderbook.orderbook_units[1].bid_size;
    const lowestAsk = orderbook.orderbook_units[0].ask_price;
    const lowestAskSize = orderbook.orderbook_units[0].ask_size;
    const secondLowestAskSize = orderbook.orderbook_units[1].ask_size;

    // 매수 조건
    if (highestBidSize > secondHighestBidSize * 1.5) {
      console.log("Executing buy order at:", highestBid + 1);
      // 매수 로직 구현
      order("KRW-BTC", "bid", null, 5000, "price");  //지정가 매수 테스트
    }

    // 매도 조건
    if (lowestAskSize > secondLowestAskSize * 1.5) {
      console.log("Executing sell order at:", lowestAsk - 1);
      // 매도 로직 구현
      order("KRW-BTC", "ask", "0.0000001", null, "limit");
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default tradeBasedOnOrderBook;
