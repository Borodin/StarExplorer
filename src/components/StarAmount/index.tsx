import {Text} from "@telegram-apps/telegram-ui";
import * as style from './styles.module.css';
import classNames from 'classnames';

export const StarIcon = () => {
  return <div className={style.star}></div>
}

export const StarAmount = ({amount}: { amount: number }) => {
  const positive = amount >= 0;
  return <span className={classNames([style.starsAmount, positive ? style.green : styles.red])}>
    <Text weight="2">{positive ? '+' : '-'}{Math.abs(amount)}</Text> <StarIcon/>
  </span>
}