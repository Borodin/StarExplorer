import {Cell} from "@telegram-apps/telegram-ui";
import {UserAvatar} from "../UserAvatar";
import {FormatDate} from "../FormatDate";
import React from "react";
import {StarTransaction} from "typescript-telegram-bot-api/dist/types/StarTransaction";
import {User} from "typescript-telegram-bot-api/dist/types/User";
import {StarAmount} from "../StarAmount";
import {PremiumStarIcon} from "../PremiumStarIcon";

function getFullName(user: User) {
  return <span style={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <>{[user.first_name, user.last_name].filter(Boolean).join(' ')}</>
    {user.is_premium ? <PremiumStarIcon/> : null}
  </span>
}

export const TransactionItem = ({transaction}: { transaction: StarTransaction }) => {
  const partner = transaction.source || transaction.receiver;
  const starsAmount = (transaction.receiver ? -1 : 1) * transaction.amount;
  if (partner?.type === 'user') {
    return <Cell key={transaction.id}
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