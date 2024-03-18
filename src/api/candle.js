import axios from "axios";

const options = { headers: { Accept: "application/json" } };

const getCandle = async (market, to, count) => {
  const url = `https://api.upbit.com/v1/candles/minutes/1?market=${market}${
    to ? `&to=${to}` : ""
  }&count=${count}`;

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching candle data: ${error}`);
    return null;
  }
};

export default getCandle;

// market	마켓 코드 (ex. KRW-BTC)	String
// to	마지막 캔들 시각 (exclusive).
// ISO8061 포맷 (yyyy-MM-dd'T'HH:mm:ss'Z' or yyyy-MM-dd HH:mm:ss). 기본적으로 UTC 기준 시간이며 2023-01-01T00:00:00+09:00 과 같이 KST 시간으로 요청 가능.
// 비워서 요청시 가장 최근 캔들	String
// count	캔들 개수(최대 200개까지 요청 가능)	Integer
