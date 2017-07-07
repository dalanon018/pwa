# PWA

[Progressive Web Apps](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/) are experiences that combine the best of the web and the best of apps. They are useful to users from the very first visit in a browser tab, no install required. As the user progressively builds a relationship with the app over time, it becomes more and more powerful. It loads quickly, even on flaky networks, sends relevant push notifications, has an icon on the home screen, and loads as a top-level,full screen experience.

### What is a Progressive Web App?

#### A Progressive Web App is:

- **Progressive** - Works for every user, regardless of browser choice because it's built with progressive enhancement as a core tenet.
Responsive - Fits any form factor: desktop, mobile, tablet, or whatever is next.
- **Connectivity independent** - Enhanced with service workers to work offline or on low-quality networks.
- **App-like** - Feels like an app, because the app shell model separates the application functionality from application content .
- **Fresh** - Always up-to-date thanks to the [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) update process.
- **Safe** - Served via HTTPS to prevent snooping and to ensure content hasn't been tampered with.
- **Discoverable** - Is identifiable as an "application" thanks to[W3C manifest](https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android) and [service worker registration](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration) scope, allowing search engines to find it.
- **Re-engageable** - Makes re-engagement easy through features like push notifications.
- **Installable** - Allows users to add apps they find most useful to their home screen without the hassle of an app store.
- **Linkable** - Easily share the application via URL, does not require complex installation.

### Service Workers

A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like [push notifications](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web) and [background sync](https://developers.google.com/web/updates/2015/12/background-sync). In the future, service workers will support other things like periodic sync or geofencing.

The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

This boilerplate provide a minimum valuable configuration with the `offline-plugin` that just works™, but we will be introducing additional libraries for E3 to build our own service workers listed below:

- [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) - Service Worker Toolbox provides some simple helpers for use in creating our own service workers for `push notifications`.


#### Service Worker Lifecycle

![service-worker-lifecycle](https://offshorly.com/7-eleven/images/sw-lifecycle.png)


### Offline-first

Thi represents the next frontier in performant web apps: availability without a network
connection from the instant your users load the app. This is done with a
ServiceWorker and a fallback to AppCache, so this feature even works on older
browsers!

> All your files are included automatically. No manual intervention needed
thanks to Webpack's [`offline-plugin`](https://github.com/NekR/offline-plugin)

