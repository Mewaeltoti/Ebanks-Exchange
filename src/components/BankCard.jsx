import React, { useState } from "react";

const BankCard = ({ bank, rates }) => {
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);
  const bankRates = rates[bank.code] || [];

  const getBankLogo = (bankCode) => `/b-logos/${bankCode}.png`;
  const handleToggle = () => setShowAllCurrencies((prev) => !prev);

  // Sort exchange rates: USD → GBP → EUR → others
  const sortedRates = [...bankRates].sort((a, b) => {
    const order = { USD: 1, GBP: 2, EUR: 3 };
    return (order[a.currency?.id] || 99) - (order[b.currency?.id] || 99);
  });

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-300 group overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      <div className="p-5 flex gap-4 items-center">
        {/* Bank Logo */}
        <img
          alt={`${bank.name} logo`}
          src={getBankLogo(bank.code)}
          className="w-12 h-12 object-contain rounded-full"
        />
        <div className="flex-1">
          {/* Bank Name */}
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-all">
            {bank.name}
          </h3>

          {/* Exchange Rates */}
          {sortedRates.length > 0 ? (
            <div className="mt-4 flex flex-col gap-3">
              {/* Show first 3 currencies or all based on state */}
              {(showAllCurrencies ? sortedRates : sortedRates.slice(0, 3)).map(
                (rate, index) =>
                  rate.cashBuying !== "N/A" && rate.cashSelling !== "N/A" && (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {/* Currency Icon */}
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={rate.currency.imageUrl}
                            alt={rate.currency.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-medium text-gray-600">
                          {rate.currency?.id}
                        </span>
                      </div>
                      <div className="flex gap-6">
                        <span className="font-medium text-green-600">
                          {parseFloat(rate.cashBuying).toFixed(2)} ETB
                        </span>
                        <span className="font-medium text-red-600">
                          {parseFloat(rate.cashSelling).toFixed(2)} ETB
                        </span>
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No rate data available</p>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div
        className="py-2 px-4 flex justify-center items-center bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer"
        onClick={handleToggle}
      >
        <span className="text-sm font-medium text-primary">
          {showAllCurrencies ? "Show Less" : "Show More"}
        </span>
      </div>

      {/* Separator Line */}
      <div className="h-1 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 group-hover:via-primary/30 transition-all duration-300"></div>
    </div>
  );
};

export default BankCard;
