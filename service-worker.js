let json = null;
const salahNotificationReminderMap = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('checkPrayerTime', {
    periodInMinutes: 1
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== 'checkPrayerTime') return;

  try {
    const now = new Date().getTime();
    const dateString = new Date().toISOString().split('T')[0];
    console.log('Alarm triggered:', dateString, salahNotificationReminderMap);

    if (json) {
      Object.keys(json).forEach((key) => {
        const time = json[key];
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMs = new Date().setHours(hours, minutes, 0, 0);
        const timeLeftMin = (timeInMs - now) / 1000 / 60;

        console.log('Time left in minutes:', key, timeLeftMin);

        if (timeInMs - now < 10 * 60 * 1000 && timeInMs - now > 0) {
          if (!salahNotificationReminderMap[dateString]) {
            salahNotificationReminderMap[dateString] = {};
          }

          if (!salahNotificationReminderMap[dateString][key]) {
            showNotification(`Time for ${key}`, {
              body: `The time for ${key} is in less than 10 minutes`,
              icon: '/image/android-chrome-192x192.png',
              badge: '/image/android-chrome-192x192.png',
              data: {
                url: 'https://www.google.com/',
              }
            });
            salahNotificationReminderMap[dateString][key] = true;
          }
        }
      });
    }
  } catch (e) {
    console.error('Error in alarm handler:', e);
  }
});

function showNotification(title, options) {
  self.registration.showNotification(title, options);
}

self.addEventListener('message', (event) => {
  if (event.data.type === 'SCHEDULE_PRAYER_NOTIFICATIONS') {
    json = event.data.timings;
  }
});
