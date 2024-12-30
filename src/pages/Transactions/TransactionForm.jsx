import { useState } from "react";
import salary from "./assets/types/salary.svg";
import shop from "./assets/types/shop.svg";
import health from "./assets/types/health.svg";
import housing from "./assets/types/housing.svg";
import entertainment from "./assets/types/entertainment.svg";
import publicTransport from "./assets/types/public transport.svg";
import travel from "./assets/types/travel.svg";
import PropTypes from "prop-types";

export default function TransactionForm({ showForm, transactionType }) {
  const [moneyInputValue, setMoneyInputValue] = useState("");
  const [formImgSelected, setFormImgSelected] = useState(0);
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
          required
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
          // type="button"
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

TransactionForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  transactionType: PropTypes.bool.isRequired,
};
