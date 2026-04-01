export default defineAppConfig({
    ui: {
        container: {
            base: 'max-w-7xl w-full'
        },
        theme: {
            colors: ['primary', 'secondary', 'tertiary', 'bg', 'fg-sm', 'fg-md', 'fg-lg', 'fg-on-pri', 'info', 'success', 'warning', 'error', 'wallpaper']
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
