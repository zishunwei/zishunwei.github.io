if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', {scope: '/'})
        .then(function () {
            console.log('Service worker registered');
        })
        .catch((err) => {
            console.log('Service Worker registration failed: ', err);
        });
}