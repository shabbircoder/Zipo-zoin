
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "./api";
import Header from "./Header";
import { CurrencyContext } from "./currencyContext";
import Loader from "./Loader";
import CoinChart from "./CoinChart";

export default function CoinsDetails() {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { id } = useParams();

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}`, {
          params: { vs_currency: currency },
        });
        setCoin(data);
      } catch (error) {
        setError("Failed to fetch coin details");
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, [id, currency]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "INR":
        return "₹";
      default:
        return "";
    }
  };

  return (
    < div className=" " >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header onCurrencyChange={handleCurrencyChange} />
          <div className="flex flex-col md:flex-row flex-grow">
            <div className="w-full md:w-1/3 bg-[#222f3e] p-6 shadow-lg flex flex-col items-center">
              {coin ? (
                <div className="text-center text-white">
                  <img
                    src={coin.image.large}
                    alt={coin.name}
                    className="w-40 h-40 mx-auto mb-8"
                  />
                  <h2 className="text-3xl font-bold mb-6">{coin.name}</h2>
                  <p className="text-xl mb-4">
                    Rank:{" "}
                    <span className="font-semibold">
                      {coin.market_cap_rank}
                    </span>
                  </p>
                  <p className="text-xl mb-4">
                    Profit:{" "}
                    <span className="font-semibold">
                      {coin.market_data.price_change_percentage_24h}%
                    </span>
                  </p>
                  <p className="text-xl mb-4">
                    Current Price:{" "}
                    <span className="font-semibold text-xl ">
                      {getCurrencySymbol(currency)}
                      {coin.market_data.current_price[currency.toLowerCase()]}
                    </span>
                  </p>
                  <p className="text-xl">
                    Market Cap:{" "}
                    <span className="font-semibold">
                      {getCurrencySymbol(currency)}
                      {coin.market_data.market_cap[
                        currency.toLowerCase()
                      ].toLocaleString()}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="text-white">No coin data available</div>
              )}
            </div>
            <div className="w-full md:w-2/3 flex-grow bg-white ">
              <CoinChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
