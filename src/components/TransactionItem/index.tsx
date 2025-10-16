import {Cell} from "@telegram-apps/telegram-ui";
import {UserAvatar} from "../UserAvatar";
import {FormatDate} from "../FormatDate";
import React from "react";
import {StarTransaction} from "typescript-telegram-bot-api/dist/types/StarTransaction";
import {User} from "typescript-telegram-bot-api/dist/types/User";
import {StarAmount} from "../StarAmount";
import {PremiumStarIcon} from "../PremiumStarIcon";
import {bot, useAppStore} from "../../store";
import {TelegramBot} from "typescript-telegram-bot-api";

function getFullName(user: User) {
  return <span style={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <>{[user.first_name, user.last_name].filter(Boolean).join(' ')}</>
    {user.is_premium ? <PremiumStarIcon/> : null}
  </span>
}

const refund = async (transaction: StarTransaction, onSuccess: () => void) => {
  if (transaction.source && transaction.source.type === 'user' && confirm('Refund this payment?')) {
    try {
      await bot.refundStarPayment({
        user_id: transaction.source.user.id,
        telegram_payment_charge_id: transaction.id
      });
      alert('Payment refunded successfully');
      onSuccess();
    } catch (error) {
      if (TelegramBot.isTelegramError(error) && error.response.description === 'Bad Request: CHARGE_ALREADY_REFUNDED') {
        return alert('Payment already refunded');
      } else {
        throw error;
      }
    }
  } else {
    alert('Cannot refund this payment');
  }
}

export const TransactionItem = ({transaction}: { transaction: StarTransaction }) => {
  const partner = transaction.source || transaction.receiver;
  const starsAmount = (transaction.receiver ? -1 : 1) * transaction.amount;
  const getStarTransactions = useAppStore(state => state.getStarTransactions);

  if (partner?.type === 'user') {
    return <Cell key={transaction.id}
                 onClick={() => refund(transaction, getStarTransactions)}
                 after={<StarAmount amount={starsAmount}/>}
                 before={<UserAvatar user={partner.user}/>}
                 description={<FormatDate date={transaction.date}/>}
                 subtitle={partner.user.username ? '@' + partner.user.username : 'id: ' + partner.user.id}
    >{getFullName(partner.user)}</Cell>
  } else if (partner?.type === 'fragment') {
    return <Cell>fragment</Cell>
  } else if (partner?.type === 'telegram_ads') {
    return <Cell>telegram_ads</Cell>
  } else if (partner?.type === 'other') {
    return <Cell>other</Cell>
  }
}