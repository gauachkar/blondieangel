import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "LilaVibes — Dominant Anime Gamer · Virtual Roleplay · 18+";
    const metas: Record<string, string> = {
      description: "LilaVibes — fictional 45-year-old dominant anime gamer character. Virtual text-based adult roleplay entertainment. 18+ only. All content is fictional.",
      "og:title": "LilaVibes — Virtual Roleplay Character",
      "og:description": "Enter Lila's world. 25+ years of gaming & anime lore. Immersive text roleplay sessions, custom arcs, VIP membership. 18+ fictional entertainment.",
      "og:type": "website",
      "theme-color": "#8B00FF",
    };
    Object.entries(metas).forEach(([name, content]) => {
      const tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
        || Object.assign(document.createElement("meta"), { [name.startsWith("og:") ? "property" : "name"]: name });
      (tag as HTMLMetaElement).content = content;
      if (!tag.parentNode) document.head.appendChild(tag);
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
