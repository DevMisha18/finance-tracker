import Transaction from "./ExpenseCard";

export default function Transactions() {
  return (
    <>
      <header>Total: 452PLN</header>
      <article className="flex flex-col ">
        <Transaction expenseType="shop" money={450} />
        <Transaction expenseType="health" money={450} />
        <Transaction expenseType="publicTransport" money={50} />
      </article>
    </>
  );
}
