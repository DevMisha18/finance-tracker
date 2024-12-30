import LogOutButton from "./LogOutButton";
// import TransactionCard from "./TransactionCard";
import AddTransctionButton from "./AddTransactionButton";

export default function Transactions() {
  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-6 p-4 bg-gray-100 rounded-md text-2xl font-semibold">
        Total: 452PLN
        <LogOutButton />
      </header>
      <div className="relative p-[var(--content-padding)] pb-6 bg-gray-200 rounded-xl">
        <article
          className="flex flex-col gap-1 h-[450px]
                     overflow-y-scroll no-scrollbar"
        >
          <AddTransctionButton />
        </article>
      </div>
    </>
  );
}
