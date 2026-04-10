export const useHealth = async () => {
    return useFetch('/health', {
        baseURL: useRuntimeConfig().public.apiBase,
        server: false
    });
};