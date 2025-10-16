import { Section } from '@telegram-apps/telegram-ui';
import { useAppStore } from '../../store';
import { StarProceeds } from '../StarProceeds';
import { TransactionItem } from '../TransactionItem';

export const TransactionList = () => {
  const { starsTransactions } = useAppStore();
  if (!starsTransactions) {
    return null;
  }
  return (
    <>
      <StarProceeds transactions={starsTransactions} />
      <Section header="All transactions">
        {starsTransactions
          .sort((a, b) => b.date - a.date)
          .map((transaction) => (
            <TransactionItem key={(transaction.source ? 's' : 'r') + transaction.id} transaction={transaction} />
          ))}
      </Section>
    </>
  );
};
