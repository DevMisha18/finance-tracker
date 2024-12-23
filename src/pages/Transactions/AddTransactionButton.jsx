import { useState, useEffect, useRef } from "react";
import income from "./assets/buttons/income.svg";
import expense from "./assets/buttons/expense.svg";
import salary from "./assets/types/salary.svg";
import shop from "./assets/types/shop.svg";
import health from "./assets/types/health.svg";
import housing from "./assets/types/housing.svg";
import entertainment from "./assets/types/entertainment.svg";
import publicTransport from "./assets/types/public transport.svg";
import travel from "./assets/types/travel.svg";
import PropTypes from "prop-types";

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

function Form({ showForm, transactionType }) {
  const [moneyInputValue, setMoneyInputValue] = useState("");
  const [formImgSelected, setFormImgSelected] = useState(null);
  const expenseImgs = [
    shop,
    health,
    housing,
    entertainment,
    publicTransport,
    travel,
  ];
  const incomeImgs = [salary];
  const formImgs = transactionType ? incomeImgs : expenseImgs;
  return (
    showForm && (
      <form className="absolute top-8 w-[var(--form-width)] px-4 py-3 bg-red-100 rounded-xl">
        <input
          type="number"
          value={moneyInputValue}
          className="w-40 py-2 no-spin bg-transparent border-none outline-none
                   text-xl font-semibold"
          placeholder="Enter amount"
          onChange={(e) => {
            e.preventDefault();
            setMoneyInputValue(e.target.value);
          }}
        />
        <span className="text-xl">
          <strong>PLN</strong>
        </span>
        <div className="flex flex-wrap gap-2 mb-4">
          {formImgs.map((formImg, index) => (
            <img
              key={index}
              src={formImg}
              className="form__icon"
              style={{
                borderColor: formImgSelected === index ? "red" : "black",
              }}
              onClick={(e) => {
                setFormImgSelected(index);
                e.target.style.borderColor = "red";
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="w-full mt-4 py-2 rounded-lg bg-green-500 text-white
                     text-lg font-medium shadow-md
                   hover:bg-green-600 active:scale-95 transition-transform"
        >
          Save
        </button>
      </form>
    )
  );
}

Form.propTypes = {
  showForm: PropTypes.bool.isRequired,
  transactionType: PropTypes.bool.isRequired,
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
      <Form showForm={showForm} transactionType={transactionType} />
    </>
  );
}
