import * as style from '@telegram-apps/telegram-ui/dist/styles.css';
Object.keys(style); // for parcel
import './main.css';
import React from 'react';

import {createRoot} from "react-dom/client";
import {AppRoot} from "@telegram-apps/telegram-ui";
import {App} from "./App";

const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error('Failed to find the app element');
}
const root = createRoot(appElement);
root.render(<AppRoot platform="ios"><App/></AppRoot>);
