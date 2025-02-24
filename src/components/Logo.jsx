import React from "react";

const getBankLogo = (bankCode) => `/b-logos/${bankCode}.png`;

const Logo = ({ bankCode }) => {
  return (
    <div className="w-full overflow-hidden mt-6 relative">
      <div className="flex space-x-6 animate-marquee">
        {bankCode.map((bankCode, index) => (
          <img
            key={index}
            alt={`${bankCode} logo`}
            src={getBankLogo(bankCode)}
            className="sm:h-12 sm:w-12 w-10 h-10 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Logo;
