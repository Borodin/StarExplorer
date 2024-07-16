import * as style from '@telegram-apps/telegram-ui/dist/styles.css';
Object.keys(style); // for parcel
import './main.css';
import React from 'react';

import {createRoot} from "react-dom/client";
import {AppRoot} from "@telegram-apps/telegram-ui";
import {App} from "./App";

const root = createRoot(document.getElementById("app"));
root.render(<AppRoot platform="ios"><App/></AppRoot>);
