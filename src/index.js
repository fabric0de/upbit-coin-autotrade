import getMyAccount from "./api/account.js";
import getCandle from "./api/candle.js";
import order from "./api/orders.js";

getMyAccount();

async function fetchCandles() {
  const market = "KRW-BTC";
  const count = 5;
  const candles = await getCandle(market, "", count);
  console.log(candles);
}

fetchCandles();

order("KRW-BTC", "ask", "0.0001", null, "market"); // 매도 테스트
order("KRW-BTC", "bid", null, "5000", "price"); // 매수 테스트
