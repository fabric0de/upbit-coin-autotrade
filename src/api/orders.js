import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

const order = async (market, side, volume, price, ord_type) => {
  const body = {
    market, // "KRW-BTC", //마켓 ID (필수)
    side, //주문 종류 (필수) bid : 매수 , ask : 매도
    volume, //주문량 (지정가, 시장가 매도 시 필수)
    price, //주문 가격. (지정가, 시장가 매수 시 필수)
    ord_type, //주문 타입 (필수) ,limit : 지정가 주문, price : 시장가 주문(매수), market : 시장가 주문(매도)
  };

  const query = querystring.encode(body);

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = jwt.sign(payload, secret_key);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: body,
    url: `${server_url}/v1/orders`,
  };

  try {
    const response = await axios(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default order;
