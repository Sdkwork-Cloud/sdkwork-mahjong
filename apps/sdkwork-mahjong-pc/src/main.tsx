import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import i18n from "sdkwork-mahjong-pc-i18n";
import { useConfigStore } from "sdkwork-mahjong-pc-core";

useConfigStore.subscribe((state) => {
  if (i18n.language !== state.language) {
    i18n.changeLanguage(state.language);
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
