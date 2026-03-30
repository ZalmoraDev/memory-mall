export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    app: {
        head: {
            title: 'Home',
            titleTemplate: '%s | Memory Mall',
        }
    },
    modules: [
        '@nuxt/ui'
    ],
    // colorMode: {
    //     classSuffix: '',
    // },
    css: ['~/assets/css/main.css'],

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
            bePort: process.env.NUXT_PUBLIC_BE_PORT,
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api/v1',
        }
    }
});