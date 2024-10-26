document.getElementById('subscribe').addEventListener('click', async () => {
    const registration = await navigator.serviceWorker.register('/sw.js');

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BK9lMJx12VvH3d_Wt3kKOK_EjQj5aBMersComBXWxNoVkh4eAoTZiXvitVzdiXgUTZtFNhipv4fo_I9Q51kVeAk', // Replace with your VAPID key
    });

    await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker Registered');
    });
}
