export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    app: {
        head: {
            title: 'Memory Mall',
            titleTemplate: '%s | Memory Mall',
            link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        'nuxt-music-flow'
    ],


    css: ['~/assets/css/operating-system.css',
        '~/assets/css/web-browser.css',
        '~/assets/css/web/memory-mall.css'],
    colorMode: {
        preference: 'system', // default
        fallback: 'light', // fallback
        classSuffix: '' // removes default '-mode' suffix of color themes (.light instead of .light-mode etc.)
    },
    ui: {
        theme: {
            colors: [
                'info', 'success', 'warning', 'error',

                'os-primary', 'os-secondary', 'os-tertiary', 'os-wallpaper',
                'os-bg', 'os-fg-sm', 'os-fg-md', 'os-fg-lg', 'os-fg-on-pri',

                'wb-primary', 'wb-bg', 'wb-fg',

                'mm-primary', 'mm-bg', 'mm-fg', 'mm-backdrop'
            ]
        }
    },


    vite: {
        server: {
            allowedHosts: ['localhost', '127.0.0.1:3000'],
        },
    },
    pages: true,
    routeRules: {},

    $production: {},
    $development: {},

    runtimeConfig: {
        public: {
            bePort: process.env.NUXT_PUBLIC_BE_PORT,
            apiBase: 'http://127.0.0.1:3000/api/v1',
        }
    }
});