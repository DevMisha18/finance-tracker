import PropTypes from "prop-types";
import shop from "./assets/types/shop.svg";
import health from "./assets/types/health.svg";
import housing from "./assets/types/housing.svg";
import entertainment from "./assets/types/entertainment.svg";
import publicTransport from "./assets/types/public transport.svg";
import travel from "./assets/types/travel.svg";

const iconMap = {
  shop,
  health,
  housing,
  entertainment,
  publicTransport,
  travel,
};

export default function ExpenseCard({ expenseType, money }) {
  return (
    <div
      className="flex justify-between items-center gap-6
                  bg-gray-100 p-2 rounded-lg shadow-md"
    >
      <div className="flex gap-4 items-center">
        <img
          src={iconMap[expenseType]}
          alt={`${expenseType} Icon`}
          className="size-full"
        />
        <p className="text-lg font-semibold text-gray-800">{expenseType}</p>
      </div>
      <p className="text-lg font-bold text-red-600">{money} PLN</p>
    </div>
  );
}

ExpenseCard.propTypes = {
  expenseType: PropTypes.oneOf([
    "shop",
    "health",
    "housing",
    "entertainment",
    "publicTransport",
    "travel",
  ]).isRequired,
  money: PropTypes.number.isRequired,
};
