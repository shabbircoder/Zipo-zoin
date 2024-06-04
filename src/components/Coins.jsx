import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "./api.js";
import Loader from "./Loader.jsx";
import { CurrencyContext } from "./currencyContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { currency } = useContext(CurrencyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const getCoinsData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${BaseUrl}/coins/markets?vs_currency=${currency.toLowerCase()}`
        );
        setCoins(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching coins data:", error);
      } finally {
        setLoading(false);
      }
    };
    getCoinsData();
  }, [currency]);

  // Filter coins based on search input
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the data to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <form
            className="max-w-md mx-auto mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search any coins"
                required
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto">
              <table className="min-w-full mt-4 bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Rank No.
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Coin
                    </th>
                    <th className="py-2 px-4 border-b text-center border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Current Price
                    </th>
                    <th className="py-2 px-4 border-b text-center border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Market Cap
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 text-center">
                      24H Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCoins.map((coin, id) => {
                    const changePercentage =
                      coin.price_change_percentage_24h.toFixed(2);
                    const isPositive = changePercentage > 0;

                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="py-2 text-left pl-4 border-b border-gray-200 text-sm">
                          {coin.market_cap_rank}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm flex items-center">
                          <Link
                            to={`/coins/${coin.id}`}
                            className="flex items-center"
                          >
                            <img
                              src={coin.image}
                              alt={`${coin.name} logo`}
                              className="w-8 h-8 mr-2 rounded-full"
                            />
                            {coin.name}
                          </Link>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                          {currency === "USD" ? `$` : `₹`}
                          {coin.current_price.toLocaleString()}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                          {currency === "USD" ? `$` : `₹`}
                          {coin.market_cap.toLocaleString()}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                          {isPositive ? (
                            <span className="text-green-500">
                              <FaArrowUp className="inline" />{" "}
                              {changePercentage}%
                            </span>
                          ) : (
                            <span className="text-red-500">
                              <FaArrowDown className="inline" />{" "}
                              {changePercentage}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 border border-gray-300 rounded ${
                      currentPage === index + 1 ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* footer start  */}
      <hr className=" mt-2 " />
      <div className=" text-center pt-4 text-[18px] mb-2 text-white">
        Created by Shabbir 2024
      </div>
    </div>
  );
}
