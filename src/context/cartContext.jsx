import React, { createContext, useContext, useState } from "react";

const AmountContext = createContext();

export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

// Custom hook for using the context
export const useAmount = () => useContext(AmountContext);
