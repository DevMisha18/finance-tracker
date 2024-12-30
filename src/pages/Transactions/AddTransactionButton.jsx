import { useState, useEffect, useRef } from "react";
import income from "./assets/buttons/income.svg";
import expense from "./assets/buttons/expense.svg";
import PropTypes from "prop-types";
import TransactionForm from "./TransactionForm";

function Buttons({ setShowForm, setTransactionType }) {
  const [hideButtons, setHideButtons] = useState(false);
  // switchToButtons — for showing - and + buttons after + button is pressed
  const [switchToButtons, setSwitchToButtons] = useState(false);
  const incomeButtonRef = useRef(null);

  const handleHideButtons = () => {
    setHideButtons(true);
    setShowForm(true);
  };

  useEffect(() => {
    if (switchToButtons) {
      requestAnimationFrame(() => {
        incomeButtonRef.current.style.transition = "transform 80ms ease-in-out";
        incomeButtonRef.current.style.transform = "translateY(-4rem)";
      });
    }
  }, [switchToButtons]);
  return (
    <>
      {!switchToButtons && (
        <button
          onClick={() => setSwitchToButtons(true)}
          className="absolute bottom-8 right-6  hover:cursor-pointer"
        >
          <img src={income} className="size-12" />
        </button>
      )}
      {switchToButtons && !hideButtons && (
        <>
          <button
            className="absolute bottom-8 right-6  hover:cursor-pointer"
            onClick={() => {
              handleHideButtons();
              setTransactionType(false);
            }}
          >
            <img src={expense} className="size-12" />
          </button>
          <button
            ref={incomeButtonRef}
            className="absolute bottom-8 right-6 translate-y-0
                       hover:cursor-pointer"
            onClick={() => {
              handleHideButtons();
              setTransactionType(true);
            }}
          >
            <img src={income} className="size-12" />
          </button>
        </>
      )}
    </>
  );
}

Buttons.propTypes = {
  setShowForm: PropTypes.func.isRequired,
  setTransactionType: PropTypes.func.isRequired,
};

export default function AddTransctionButton() {
  const [showForm, setShowForm] = useState(false);
  // true - income, false - expense
  const [transactionType, setTransactionType] = useState(false);
  return (
    <>
      <Buttons
        setShowForm={setShowForm}
        setTransactionType={setTransactionType}
      />
      <TransactionForm showForm={showForm} transactionType={transactionType} />
    </>
  );
}
