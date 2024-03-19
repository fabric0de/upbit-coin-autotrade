import getCandle from "./candle.js";
import order from "./orders.js";

const executeTradeStrategy = async (market, to, count) => {
  const candles = await getCandle(market, to, count);

  const latestCandle = candles[0];
  console.log(latestCandle);

  if (!latestCandle) return;

  const { openingPrice, tradePrice } = latestCandle;

  if (tradePrice > openingPrice) {
    console.log("매수 신호: 최근 캔들이 양봉입니다.");
    // 시장가 매수를 예시로 사용, 매수할 총 KRW 금액을 명시
    order("KRW-BTC", "bid", null, "5000", "market");
  } else if (tradePrice < openingPrice) {
    console.log("매도 신호: 최근 캔들이 음봉입니다.");
    // 시장가 매도, 매도할 코인의 양을 명시
    order("KRW-BTC", "ask", "0.0001", null, "market");
  } else {
    console.log("변동 없음: 최근 캔들이 동일 가격으로 마감됨.");
  }
};

export default executeTradeStrategy;
