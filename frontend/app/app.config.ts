export default defineAppConfig({
    ui: {
        theme: {
            colors: [
                'primary', 'secondary', 'tertiary',
                'bg', 'fg-sm', 'fg-md', 'fg-lg', 'fg-on-pri',
                'wallpaper',
                'info', 'success', 'warning', 'error'
            ]
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