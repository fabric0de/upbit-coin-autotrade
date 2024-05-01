import tradeBasedOnOrderBook from "./api/tradeOnOrderBook.js";
import order from "./api/orders.js";

console.log("Trading bot started!");
tradeBasedOnOrderBook();
//order("KRW-BTC", "bid", null, 5000, "price");
