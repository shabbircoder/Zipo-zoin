import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyContext } from './currencyContext';

const Header = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <nav className="bg-[#222f3e] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-lg">
          <Link to={"/"}>
            Zipo-Coin
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Link
            to="/coins"
            className="text-white mr-2 hover:text-gray-300"
          >
            Coins
          </Link> */}
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="w-24 h-10 border cursor-pointer border-gray-300 rounded-md bg-gray-700 text-white"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Header;
