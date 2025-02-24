import { useState } from "react";


const CurrencyConverterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isToETB, setIsToETB] = useState(true); // Switch between ETB conversion

  // Hardcoded data for banks and currencies
  const banks = [
    { code: "BNK1", name: "Bank 1" },
    { code: "BNK2", name: "Bank 2" },
    { code: "BNK3", name: "Bank 3" },
  ];

  const currencies = [
    { id: "USD", name: "USD" },
    { id: "EUR", name: "EUR" },
    { id: "GBP", name: "GBP" },
  ];

  const exchangeRates = {
    USD: 50, // Example conversion rate for USD to ETB
    EUR: 60, // Example conversion rate for EUR to ETB
    GBP: 70, // Example conversion rate for GBP to ETB
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConversion = () => {
   const [selectedBank, setSelectedBank] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvert = () => {
    if (amount && selectedCurrency) {
      // Conversion logic goes here
      // For example, we assume conversion rate from selectedCurrency to ETB
      const rate = 50; // Example rate, replace with actual calculation logic
      setConvertedAmount(amount * rate);
    }
  };

  return (
    <dialog id="currency_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Currency Converter</h3>

        {/* Bank Selector */}
        <div className="py-4">
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Bank</option>
            {/* Add bank options here */}
            <option value="Bank1">Bank 1</option>
            <option value="Bank2">Bank 2</option>
          </select>
        </div>

        {/* Currency Selector */}
        <div className="py-4">
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            {/* Add more currencies here */}
          </select>
        </div>

        {/* Amount Input */}
        <div className="py-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Convert and Cancel buttons side by side */}
        <div className="modal-action flex justify-between w-full">
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById("currency_modal").close()}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleConvert}
          >
            <FaExchangeAlt /> Convert
          </button>
        </div>

        {/* Converted Amount in Disabled Input */}
        {convertedAmount !== null && (
          <div className="py-4">
            <input
              type="text"
              value={`${convertedAmount} ETB`}
              className="input input-bordered w-full"
              disabled
            />
          </div>
        )}
      </div>
    </dialog>
  );}
};

export default CurrencyConverterModal;
