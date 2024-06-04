
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "./api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CurrencyContext } from "./currencyContext";
import Loader from "./Loader";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinChart() {
  const { id } = useParams();
  const { currency } = useContext(CurrencyContext);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(1);

  const coinsChartData = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}`
      );
      setChartData(data.prices);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    coinsChartData();
  }, [id, days, currency]);

  const myData = {
    labels: chartData?.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Prices in Past ${days} Day(s)`,
        data: chartData?.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: 3,
      },
    ],
  };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full bg-[#222f3e] flex flex-col pb-4 text-white ">
      <div className="flex-grow">
        <Line
          data={myData}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
          className="h-full"
        />
      </div>
      <div className="md:flex grid sm:grid-cols-2 gap-2 justify-center mt-4">
        <button
          className={`bg-blue-500 w-36 text-white py-2 px-4 rounded ${
            days === 1 ? "bg-blue-700" : ""
          }`}
          onClick={() => setDays(1)}
        >
          24 Hours
        </button>
        <button
          className={`bg-blue-500 w-36 text-white py-2 px-4 rounded ${
            days === 30 ? "bg-blue-700" : ""
          }`}
          onClick={() => setDays(30)}
        >
          1 Month
        </button>
        <button
          className={`bg-blue-500 w-36 text-white py-2 px-4 rounded ${
            days === 90 ? "bg-blue-700" : ""
          }`}
          onClick={() => setDays(90)}
        >
          3 Months
        </button>
        <button
          className={`bg-blue-500 w-36 text-white py-2 px-4 rounded ${
            days === 365 ? "bg-blue-700" : ""
          }`}
          onClick={() => setDays(365)}
        >
          1 Year
        </button>
      </div>
    </div>
  );
}
