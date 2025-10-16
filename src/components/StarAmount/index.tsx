import { Text } from '@telegram-apps/telegram-ui';
import classNames from 'classnames';
import * as style from './styles.module.css';

export const StarIcon = () => {
  return <div className={style.star} />;
};

export const StarAmount = ({ amount }: { amount: number }) => {
  const positive = amount >= 0;
  return (
    <span className={classNames([positive ? style.green : style.red])}>
      <Text weight="2">
        {positive ? '+' : '-'}
        {Math.abs(amount)}
      </Text>{' '}
      <StarIcon />
    </span>
  );
};
