// dbContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { getUserData, addTransaction } from "../services/dbService";
import PropTypes from "prop-types";

const DbContext = createContext();

export function useDb() {
  return useContext(DbContext);
}

export function DbProvider({ children, uid }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserData(uid);
      setTransactions(data);
    };
    getData();
  }, [uid]);

  const addExpense = async (transaction) => {
    addTransaction(uid, transaction);
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <DbContext.Provider value={{ transactions, addExpense }}>
      {children}
    </DbContext.Provider>
  );
}

DbProvider.propTypes = {
  children: PropTypes.node.isRequired,
  uid: PropTypes.string,
};
