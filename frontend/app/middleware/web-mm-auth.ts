// TODO: Add auth logic
function isAuthenticated(): boolean {
    return false;
}

export default defineNuxtRouteMiddleware((to, from) => {
    if (!isAuthenticated()) {

        // TODO: Use toast popup to notify user
        console.log('Not authenticated');
        return navigateTo('/memory-mall');
    }
});