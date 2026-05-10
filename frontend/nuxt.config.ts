declare const process: { env: Record<any, any> };
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  app: {
    head: {
      title: "Memory Mall",
      titleTemplate: "%s | Memory Mall",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "nuxt-music-flow"],

  imports: {
    dirs: ["types"],
  },
  css: [
    "~/assets/css/main.css"
  ],
  colorMode: {
    preference: "system", // default
    fallback: "light", // fallback
    classSuffix: "", // removes default '-mode' suffix of color themes (.light instead of .light-mode etc.)
  },
  ui: {
    colorMode: false
  },


  vite: {
    server: {
      allowedHosts: ["localhost", "127.0.0.1:3000"],
    },
  },
  pages: true,
  routeRules: {},

  $production: {},
  $development: {},

  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:3000/api/v1",
    },
  },
});
