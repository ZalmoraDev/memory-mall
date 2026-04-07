export default defineAppConfig({
    ui: {
        theme: {
            colors: [
                'info', 'success', 'warning', 'error',

                'os-primary', 'os-secondary', 'os-tertiary', 'os-wallpaper',
                'os-bg', 'os-fg-sm', 'os-fg-md', 'os-fg-lg', 'os-fg-on-pri',

                'wb-primary', 'wb-bg', 'wb-fg'
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