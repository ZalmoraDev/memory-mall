export default defineAppConfig({
    ui: {
      colorMode: false,
        theme: {
            colors: [
                'os-primary', 'os-secondary', 'os-tertiary', 'os-wallpaper',
                'os-bg', 'os-fg-sm', 'os-fg-md', 'os-fg-lg', 'os-fg-on-pri'
            ],
        },
        button: {
            slots: {
                base: 'cursor-pointer',
            }
        },
        dropdownMenu: {
            slots: {
                item: 'cursor-pointer',
            }
        }
    }
});