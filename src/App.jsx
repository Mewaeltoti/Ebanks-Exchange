import { useState, useEffect } from "react";
import BankCard from "./components/BankCard";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import CurrencyConverterModal from "./components/CurrencyConverterModal";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function ExchangeRates() {
  const [banks, setBanks] = useState([]);
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const banksPerPage = 4; // Show 4 banks per page
  const totalPages = Math.ceil(banks.length / banksPerPage);

  const API_KEY = import.meta.env.VITE_FETAN_BANK_API;

  // Calculate pagination indices
  const indexOfLastBank = currentPage * banksPerPage;
  const indexOfFirstBank = indexOfLastBank - banksPerPage;
  const currentBanks = banks.slice(indexOfFirstBank, indexOfLastBank);

  // Fetch Bank List
  useEffect(() => {
    const cachedBanks = localStorage.getItem("banks");

    if (cachedBanks) {
      console.log("📌 Loading banks from localStorage...");
      setBanks(JSON.parse(cachedBanks));
    } else {
      console.log("🌐 Fetching banks from API...");
    }

    fetch("https://api.et-forex.com/api/v1/banks", {
      headers: { "x-api-key": API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 200 && Array.isArray(data.data)) {
          console.log("✅ Banks fetched from API, updating localStorage...");
          setBanks(data.data);
          localStorage.setItem("banks", JSON.stringify(data.data));
          fetchExchangeRates(data.data);
        }
      })
      .catch(() => console.error("❌ Failed to fetch banks."));
  }, []);

  // Fetch Exchange Rates
  const fetchExchangeRates = async (bankList) => {
    setIsLoading(true);

    const cachedRates = localStorage.getItem("exchangeRates");
    if (cachedRates) {
      console.log("📌 Loading exchange rates from localStorage...");
      setRates(JSON.parse(cachedRates));
      setIsLoading(false);
      return;
    }

    console.log("🌐 Fetching exchange rates from API...");

    try {
      const results = await Promise.all(
        bankList.map(async (bank) => {
          const response = await fetch(
            `https://api.et-forex.com/api/v1/rates?bankCode=${bank.code}`,
            {
              headers: { "x-api-key": API_KEY },
            }
          );
          const data = await response.json();
          return {
            [bank.code]:
              data.data.find((b) => b.code === bank.code)?.exchangeRates || [],
          };
        })
      );

      const newRates = Object.assign({}, ...results);
      console.log("✅ Exchange rates fetched from API, updating localStorage...");
      setRates(newRates);
      localStorage.setItem("exchangeRates", JSON.stringify(newRates));
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      
        <Navbar />
       
      <CurrencyConverterModal />
      <main className="flex flex-col items-center min-h-screen bg-base-200 p-6 pt-24">
        <div className="w-full max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {Array.from({ length: banksPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-white shadow-lg rounded-xl flex flex-col gap-3"
                >
                  <Skeleton height={30} width="80%" /> {/* Bank Name */}
                  <Skeleton height={20} width="60%" /> {/* Exchange Rate Title */}
                  <div className="flex flex-col gap-2">
                    <Skeleton height={15} width="100%" /> {/* Exchange Rates */}
                    <Skeleton height={15} width="90%" />
                    <Skeleton height={15} width="95%" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <section className="card shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Ethiopian <span className="text-accent">Banks</span> Exchange Rates
              </h2>

              {errorMessage ? (
                <div className="alert alert-error shadow-lg">
                  <span>⚠ {errorMessage}</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {currentBanks.map((bank) => (
                      <BankCard key={bank.code} bank={bank} rates={rates} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="join mt-6 flex justify-center">
                    <button
                      className="join-item btn btn-square"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span className="join-item btn btn-square">{currentPage}</span>
                    <button
                      className="join-item btn btn-square"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
