import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { QueryClientProvider } from "@tanstack/react-query";
import { DeskproAppProvider } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { App } from "./App";
import { ReplyBoxProvider } from "./hooks";

import "iframe-resizer/js/iframeResizer.contentWindow.js";
import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render((
  <React.StrictMode>
    <DeskproAppProvider>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <ReplyBoxProvider>
            <App />
          </ReplyBoxProvider>
        </QueryClientProvider>
      </HashRouter>
    </DeskproAppProvider>
  </React.StrictMode>
));
