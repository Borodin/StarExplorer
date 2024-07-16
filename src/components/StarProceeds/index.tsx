import {Cell, Section} from "@telegram-apps/telegram-ui";
import React from "react";
import {StarTransaction} from "typescript-telegram-bot-api/dist/types/StarTransaction";
import {StarIcon} from "../StarAmount";


const StarAmountInUSD = ({amount}: { amount: number }) => {
  const [whole, fraction] = (amount * 0.013).toFixed(2).toString().split('.');
  return <span>
    <StarIcon/>
    <span style={{
      fontSize: '1.2em',
    }}> {amount}</span>
    <span style={{
      color: 'var(--tgui--hint_color)',
    }}> ≈${whole}.<span style={{fontSize: '0.75em'}}>{fraction}</span></span>
  </span>
}

export const StarProceeds = ({transactions}: { transactions: StarTransaction[] }) => {
  const sourceAmount = transactions.filter(t => t.source).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0)

  const receiverAmount = transactions.filter(t => t.receiver).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0)

  const available = 0;
  const total = sourceAmount - receiverAmount;

  return <Section header="Proceeds overview"
                  footer="Stars from your total balance become available for spending on ads and rewards 21 days after they are earned.">
    <Cell subtitle="Available balance"><StarAmountInUSD amount={available}/></Cell>
    <Cell subtitle="Total lifetime proceeds"><StarAmountInUSD amount={total}/></Cell>
  </Section>
}