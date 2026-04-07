export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    app: {
        head: {
            title: 'Home',
            titleTemplate: '%s | Memory Mall',
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        'nuxt-music-flow'
    ],


    css: ['~/assets/css/operating-system.css',
        '~/assets/css/web-browser.css',
        '~/assets/css/projects/memory-mall.css'],
    colorMode: {
        preference: 'system', // default
        fallback: 'light', // fallback
        classSuffix: '' // removes default '-mode' suffix of color themes (.light instead of .light-mode etc.)
    },
    ui: {
        theme: {
            colors: [
                'primary', 'secondary', 'tertiary',
                'bg', 'fg-sm', 'fg-md', 'fg-lg', 'fg-on-pri',
                'wallpaper',
                'info', 'success', 'warning', 'error'
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
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api/v1',
        }
    }
});