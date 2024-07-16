import {useAppStore} from "../../store";
import {Section, ButtonCell} from "@telegram-apps/telegram-ui";
import React from "react";
import {TransactionItem} from "../TransactionItem";
import {StarProceeds} from "../StarProceeds";

export const TransactionList = () => {
  const {starsTransactions} = useAppStore();
  if (!starsTransactions) {
    return null;
  }
  return (
    <>
      <StarProceeds transactions={starsTransactions.transactions}/>
      <Section header="All transactions">
        {starsTransactions?.transactions
          .sort((a, b) => b.date - a.date)
          .map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction}/>
          ))}
        <ButtonCell>Show more</ButtonCell>
      </Section>
    </>
  );
}