/* eslint-disable no-undef */
self.addEventListener("push", (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/favicon.ico",
        data: { url: data.url || "/" },
    });
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const url = event.notification.data.url;
    event.waitUntil(clients.openWindow(url));
});
