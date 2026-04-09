import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";
// INTEGRATION SPECIALIST AGENT — AuthProvider wraps entire app so useAuth() works anywhere
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  useEffect(() => {
    document.title = "Blondie Angel — Dominant Anime Gamer · Virtual Roleplay · 18+";
    const metas: Record<string, string> = {
      description: "Blondie Angel — 18-year-old dominant anime gamer brat. Premium adult content, text sessions, findom, feet content & more. 18+ only.",
      "og:title": "Blondie Angel — Dominant Anime Gamer Brat",
      "og:description": "Enter Blondie's world. Dominant sessions, findom, anime RP, gamer companion, feet content & custom arcs. VIP membership. 18+ only.",
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
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
