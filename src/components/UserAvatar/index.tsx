import React, {useEffect, useState} from 'react';
import {useAvatarStore} from '../../store';
import {Avatar, Text} from "@telegram-apps/telegram-ui";
import * as style from './styles.module.css';
import {User} from "typescript-telegram-bot-api/dist/types/User";


const AcronymAvatar = ({user}: { user: User }) => {
  const acronym = [user.first_name, user.last_name]
    .map((name) => name ? name[0].toUpperCase() : '').join('');
  return <span className={style.fallback}><Text weight="3">{acronym}</Text></span>;
}


export const UserAvatar = ({user, size}: { user: User, size?: 20 | 24 | 28 | 40 | 48 | 96 }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fetchAvatar = useAvatarStore(state => state.fetchAvatar);

  useEffect(() => {
    fetchAvatar(user.id).then(url => {
      setAvatarUrl(url);
    });
  }, [user.id, fetchAvatar]);

  const colors = [12211792, 12745790, 9792200, 4825941, 4102061, 5935035, 12079992];
  return <Avatar className={style.avatar}
                 size={size}
                 style={{'--color': '#' + colors[user.id % colors.length].toString(16)} as React.CSSProperties}
                 fallbackIcon={<AcronymAvatar user={user}/>}
                 src={avatarUrl || ''}/>;
};
