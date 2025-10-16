import React, {useEffect, useState} from "react";
import {Button, Placeholder, Input, List, Section} from "@telegram-apps/telegram-ui";
import {TransactionList} from "./components/TransactionList/";
import {BotInfo} from "./components/BotInfo/";
import {useAppStore} from "./store";
import Lottie from "lottie-react";
import duckSticker from "./stickers/duck.json";

export const App = () => {
  const {
    disconnectBot,
    connectBot,
    botInfo,
    botShortDescription,
    botName,
    botToken,
    connectionError,
    loading
  } = useAppStore();
  const [inputBotToken, setInputBotToken] = useState(botToken || '');

  useEffect(() => {
    if (botToken && !botInfo) {
      connectBot(botToken);
    }
  }, [botToken, botInfo, connectBot]);

  return (
    <>
      <List
        style={{
          background: 'var(--tgui--secondary_bg_color)',
          padding: '40px',
        }}
      >

        {botInfo ? <BotInfo
          bot={botInfo}
          botShortDescription={botShortDescription}
          botName={botName}
          logout={() => disconnectBot()}
        /> : <Section
          header="Connect your Telegram Bot"
          footer="You can create a bot using @BotFather in Telegram"
        >
          <Input
            header="Bot token"
            placeholder="Bot token"
            status={connectionError ? 'error' : 'default'}
            value={inputBotToken}
            onChange={(e) => setInputBotToken(e.target.value)}
            after={<Button size="s"
                           loading={loading}
                           disabled={!inputBotToken}
                           onClick={() => connectBot(inputBotToken)}>Connect</Button>}
          />
        </Section>}

        {/*<Section*/}
        {/*  header="Create invoice link"*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    header="Title"*/}
        {/*    placeholder="Title"*/}
        {/*  />*/}
        {/*  <Textarea*/}
        {/*    header="Description"*/}
        {/*    placeholder="Description"*/}
        {/*    ></Textarea>*/}
        {/*  <Input*/}
        {/*    header="Amount"*/}
        {/*    placeholder="Amount"*/}
        {/*    type="number"*/}
        {/*    value={1}*/}
        {/*  />*/}
        {/*  <ButtonCell>Generate link</ButtonCell>*/}
        {/*</Section>*/}
        {botInfo ? <TransactionList/> :
          <Placeholder
            header="Transactions"
            description={<>Connect your Telegram Bot to see transactions<br/>
              <a href="https://github.com/Borodin/StarExplorer" target="_blank">Learn more</a></>}>
            <Lottie style={{width: 160, height: 160}} animationData={duckSticker} loop={true}/>
          </Placeholder>}
      </List>
    </>
  );
};