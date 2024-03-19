import getMyAccount from "./api/account.js";
import getCandle from "./api/candle.js";
//import order from "./api/orders.js";
import executeTradeStrategy from "./api/tradeStrategy.js";

//getMyAccount();

async function fetchCandles() {
  const market = "KRW-BTC";
  const count = 5;
  const candles = await getCandle(market, "", count);
  console.log(candles);
}
//fetchCandles();

console.log("Trading bot started!");
setInterval(() => {
  const now = new Date();
  console.log(`전략 실행 시간: ${now.toLocaleString()}`); // 현지 시간 형식으로 시간 출력
  executeTradeStrategy("KRW-BTC", "", 5);
}, 600000);

executeTradeStrategy("KRW-BTC", "", 5);
