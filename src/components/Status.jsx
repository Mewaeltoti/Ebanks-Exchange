import { useState, useEffect } from 'react';

const Status = () => {
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const API_KEY = import.meta.env.VITE_FETAN_BANK_API;

  // Fetch Bank List and Currencies
  useEffect(() => {
    fetch("https://api.et-forex.com/api/v1/banks", {
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 200 && Array.isArray(data.data)) {
          setBanks(data.data);
        } else {
          console.error("Error fetching banks");
        }
      })
      .catch((error) => console.error("Error fetching banks:", error));

    fetch("https://api.et-forex.com/api/v1/currencies", {
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 200 && Array.isArray(data.data)) {
          setCurrencies(data.data);
        } else {
          console.error("Error fetching currencies");
        }
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  return (
 
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2L2 7h3v7h2V9h8v5h2V7h3L12 2z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Banks</div>
          <div className="stat-value text-primary">{banks.length}</div>
          <div className="stat-desc">Number of banks available</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Currencies</div>
          <div className="stat-value text-secondary">{currencies.length}</div>
          <div className="stat-desc">Number of currencies available</div>
        </div>

      
      </div>
    
  );
};

export default Status;
