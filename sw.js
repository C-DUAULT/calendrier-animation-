self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Planning NOA';
  const options = {
    body: data.body || '',
    icon: '/calendrier-animation-/icon.png',
    badge: '/calendrier-animation-/icon.png',
    data: { url: data.url || '/' },
    actions: [
      { action: 'oui', title: '✅ Oui' },
      { action: 'non', title: '❌ Non' },
      { action: 'maybe', title: '🤔 Peut-être' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const action = event.action;
  const url = event.notification.data.url + (action ? '&response='+action : '');
  event.waitUntil(clients.openWindow(url));
});
