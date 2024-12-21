import TransactionCard from "./TransactionCard";

export default function Transactions() {
  return (
    <>
      <header>Total: 452PLN</header>
      <article className="flex flex-col ">
        <TransactionCard expenseType="shop" money={450} />
        <TransactionCard expenseType="health" money={450} />
        <TransactionCard expenseType="salary" money={40000} color="green" />
      </article>
    </>
  );
}
