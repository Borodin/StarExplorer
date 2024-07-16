import React from "react";
import {Banner, Button} from "@telegram-apps/telegram-ui";
import {UserAvatar} from "../UserAvatar";
import {User} from "typescript-telegram-bot-api/dist/types/User";

export const BotInfo = ({bot, botShortDescription, botName, logout}: {
  bot: User
  botShortDescription: string | null
  botName: string | null
  logout: () => void
}) => {
  return <>
    <Banner
      before={<UserAvatar size={96} user={bot}/>}
      header={botName || bot.first_name || 'Bot'}
      subheader={botShortDescription || 'Bot description'}
      type="section"
    >
      <Button size="s" onClick={logout}>Log out</Button>
    </Banner>
  </>
}