export const useFeaturedListings = () => {
    return useFetch('/listings', {
        baseURL: useRuntimeConfig().public.apiBase,
        server: false,
        query: {
            limit: 12,
            featured: true
        }
    });
};

