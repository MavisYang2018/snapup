/*
register service worker
*/
if (navigator.serviceWorker != null) {
    navigator.serviceWorker.register("./sw.js").then(
        registration => {
            console.log("support service worker:",registration.scope);
        }
    ).catch(
        error => {
            console.log("not support service worker:",error);
        }
    )
}
