export const useHealth = () => {
    return useFetch('/health', {
        baseURL: useRuntimeConfig().public.apiBase,
        server: false
    });
};