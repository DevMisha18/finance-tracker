import TransactionCard from "./TransactionCard";
import AddTransctionButton from "./AddTransactionButton";

export default function Transactions() {
  return (
    <>
      <header className="mt-2 mb-6 p-4 bg-gray-100 rounded-md text-2xl font-semibold">
        Total: 452PLN
      </header>
      <div className="relative p-[var(--content-padding)] pb-6 bg-gray-200 rounded-xl">
        <article
          className="flex flex-col gap-1 h-[450px]
                     overflow-y-scroll no-scrollbar"
        >
          <TransactionCard expenseType="shop" money={450} />
          <TransactionCard expenseType="health" money={450} />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <TransactionCard expenseType="salary" money={40000} color="green" />
          <AddTransctionButton />
        </article>
      </div>
    </>
  );
}
