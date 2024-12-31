import { useDb } from "../../context/DbContext";
import LogOutButton from "./LogOutButton";
import TransactionCard from "./TransactionCard";
import AddTransctionButton from "./AddTransactionButton";

export default function Transactions() {
  const { transactions } = useDb();
  const totalMoney = transactions.reduce(
    (acc, transaction) => acc + Number(transaction.money),
    0
  );
  const totalMoneyClass =
    totalMoney > 0
      ? "text-green-600 bg-green-100 hover:scale-105 hover:shadow-md"
      : totalMoney < 0
      ? "text-red-600 bg-red-100 hover:scale-105 hover:shadow-md"
      : "text-blue-600 bg-blue-100 hover:scale-105 hover:shadow-md";
  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-6 p-4 bg-gray-100 rounded-md text-2xl font-semibold">
        <div>
          Total:
          <span
            className={`font-bold text-xl px-2 py-1 rounded-md inline-block
                      transition-all duration-300 ${totalMoneyClass}`}
          >
            {totalMoney}
          </span>
          PLN
        </div>
        <LogOutButton />
      </header>
      <div className="relative p-[var(--content-padding)] pb-6 bg-gray-200 rounded-xl">
        <article
          className="flex flex-col gap-1 h-[450px]
                     overflow-y-scroll no-scrollbar"
        >
          {transactions.map((transaction) => {
            const { type, money, timestamp } = transaction;
            const key = timestamp.seconds; // it's always unique
            const color = type === "salary" ? "green" : "red";

            return (
              <TransactionCard
                key={key}
                expenseType={type}
                money={Number(money)}
                color={color}
              />
            );
          })}
          <AddTransctionButton />
        </article>
      </div>
    </>
  );
}
