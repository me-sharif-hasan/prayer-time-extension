let json = null;
const salahNotificationReminderMap = {};
setInterval(() => {
    try{
        const now = new Date().getTime();
        const dateString=new Date().toISOString().split('T')[0];
        console.log('Current date:', dateString,salahNotificationReminderMap);
        if(json){
            Object.keys(json).forEach((key) => {
                const time=json[key];
                const [hours, minutes] = time.split(':').map(Number);
                const timeInMs = new Date().setHours(hours, minutes, 0, 0);
                //check if there is 10 minutes left to the time
                console.log('time left in minutes:',key, (timeInMs - now) / 1000 / 60);
                if (timeInMs - now < 10 * 60 * 1000 && timeInMs - now > 0) {
                    console.log(`Time for ${key} is in less than 10 minutes`);
                    if(!salahNotificationReminderMap[dateString]){
                        salahNotificationReminderMap[dateString] = {};
                    }
                    if(!salahNotificationReminderMap[dateString][key]){
                        //send notification
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
        }catch(e){
            console.error('Error in service worker:', e);
        }
    }, 1000*60);

function showNotification(title, options) {
    self.registration.showNotification(title, options);
}

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_PRAYER_NOTIFICATIONS') {
        json = event.data.timings;
    }
});