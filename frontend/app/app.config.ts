export default defineAppConfig({
    ui: {
        theme: {
            colors: [
                'primary', 'secondary', 'tertiary',
                'bg', 'fg-sm', 'fg-md', 'fg-lg', 'fg-on-pri',
                'info', 'success', 'warning', 'error',
                'wallpaper', 'start-button', 'close-button', 'turn-off-button', 'log-off-button']
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