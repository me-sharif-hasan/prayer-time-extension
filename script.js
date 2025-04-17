// Real-time analog clock and sun/moon animation
function updateClockAndSunMoon() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const isDay = now.getHours() >= 6 && now.getHours() < 18;

    // Update clock hands
    const hourDeg = (hours + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    document.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;

    // Update sun/moon position
    const sunMoon = document.querySelector('.sun-moon');
    sunMoon.className = `sun-moon ${isDay ? 'sun' : 'moon'}`;
    const timeFraction = (now.getHours() * 3600 + minutes * 60 + seconds) / (24 * 3600);
    const angle = timeFraction * 2 * Math.PI;
    const radiusX = 60;
    const radiusY = 30;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    sunMoon.style.transform = `translate(${x}px, ${y - 40}px)`;

    requestAnimationFrame(updateClockAndSunMoon);
}
updateClockAndSunMoon();

// Set current date
const dateElement = document.getElementById('currentDate');
const today = new Date();
dateElement.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Handle search/URL bar input
const searchBar = document.getElementById('searchBar');
const searchIcon = document.getElementById('searchIcon');
const searchIconPath = `<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>`;
const goIconPath = `<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>`;

function updateIcon() {
    const input = searchBar.value.trim();
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
    searchIcon.innerHTML = urlPattern.test(input) ? goIconPath : searchIconPath;
}

searchBar.addEventListener('input', updateIcon);

searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let input = searchBar.value.trim();
        if (input) {
            const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
            if (urlPattern.test(input)) {
                if (!input.startsWith('http://') && !input.startsWith('https://')) {
                    input = 'https://' + input;
                }
                window.location.href = input;
            } else {
                const query = encodeURIComponent(input);
                window.location.href = `https://www.google.com/search?q=${query}`;
            }
        }
    }
});

// Function to convert 24-hour time to 12-hour format with two digits
function to12HourFormat(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Function to convert time to seconds since midnight
function timeToSeconds(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60;
}

// Function to calculate remaining time with seconds
function calculateRemainingTime(prayerTime) {
    const now = new Date();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let prayerSeconds = timeToSeconds(prayerTime);

    // Calculate time difference
    let diff = prayerSeconds - currentSeconds;
    if (diff < 0) {
        // Prayer time has passed today, calculate until tomorrow's prayer
        diff += 24 * 3600;
    }

    const hoursLeft = Math.floor(diff / 3600);
    const minutesLeft = Math.floor((diff % 3600) / 60);
    const secondsLeft = diff % 60;
    return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s left`;
}

// Function to check if cached data is older than 3 days
function isCacheExpired(timestamp) {
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    const now = Date.now();
    return now - timestamp > threeDaysInMs;
}

// Function to display no salah data card
function displayNoSalahCard() {
    const prayerTimesContainer = document.getElementById('prayerTimes');
    prayerTimesContainer.innerHTML = `
        <div class="prayer-card">
            <h3>No Salah Data</h3>
            <p>Cached data is outdated or unavailable. Please check your internet connection.</p>
        </div>
    `;
}

// Function to display prayer times and highlight upcoming
function displayPrayerTimes(timings) {
    const prayerTimesContainer = document.getElementById('prayerTimes');
    const now = new Date();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const prayers = [
        {
            name: 'Fajr',
            time: timings.Fajr,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e6c992" d="M12 3a9 9 0 0 0 9 9c0 4.97-4.03 9-9 9a9 9 0 0 1 0-18z"/></svg>'
        },
        {
            name: 'Sunrise',
            time: timings.Sunrise,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="%23e6c992"/><path fill="%23e6c992" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.364-5.364l-1.414 1.414M5.636 17.364l-1.414 1.414m13.728 0l-1.414-1.414M5.636 6.636l-1.414-1.414"/></svg>'
        },
        {
            name: 'Dhuhr',
            time: timings.Dhuhr,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e6c992" d="M12 4l-8 8h16l-8-8z"/></svg>'
        },
        {
            name: 'Asr',
            time: timings.Asr,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e6c992" d="M4 12h16l-8 8-8-8z"/></svg>'
        },
        {
            name: 'Maghrib',
            time: timings.Maghrib,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e6c992" d="M12 20a8 8 0 0 1-8-8h16a8 8 0 0 1-8 8z"/></svg>'
        },
        {
            name: 'Isha',
            time: timings.Isha,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e6c992" d="M12 3v6l4 4-4 4v6h-2v-6l-4-4 4-4V3h2z"/></svg>'
        }
    ];

    let upcomingPrayer = null;
    let minDiff = Infinity;

    prayers.forEach(prayer => {
        let prayerSeconds = timeToSeconds(prayer.time);
        let diff = prayerSeconds - currentSeconds;
        if (diff < 0) diff += 24 * 3600; // Look at next occurrence tomorrow
        if (diff < minDiff && prayer.name !== 'Sunrise') {
            minDiff = diff;
            upcomingPrayer = prayer;
        }
    });

    prayerTimesContainer.innerHTML = '';
    prayers.forEach(prayer => {
        const isUpcoming = prayer === upcomingPrayer;
        const card = document.createElement('div');
        card.className = `prayer-card ${isUpcoming ? 'upcoming' : ''}`;
        card.innerHTML = `
            <img src='${prayer.icon}' class="prayer-icon" alt="${prayer.name} icon">
            <h3>${prayer.name}</h3>
            <p>${to12HourFormat(prayer.time)}</p>
            ${isUpcoming ? `<div class="countdown">${calculateRemainingTime(prayer.time)}</div>` : ''}
        `;
        prayerTimesContainer.appendChild(card);
    });
}

// Function to fetch prayer times by coordinates
async function fetchPrayerTimesByCoords(latitude, longitude) {
    const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1&school=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200) {
            // Store new data in localStorage with timestamp
            const cache = {
                timings: data.data.timings,
                timestamp: Date.now()
            };
            localStorage.setItem('prayerTimesCache', JSON.stringify(cache));
            displayPrayerTimes(data.data.timings);
            setInterval(() => displayPrayerTimes(data.data.timings), 1000);
            // Stop any retry attempts since we have fresh data
            if (window.retryInterval) {
                clearInterval(window.retryInterval);
                window.retryInterval = null;
            }
        } else {
            console.log("Error loading prayer times");
            loadCachedData();
        }
    } catch (error) {
        console.log("Error loading prayer times: ", error);
        loadCachedData();
        // Start retry mechanism if not already running
        if (!window.retryInterval && !navigator.onLine) {
            window.retryInterval = setInterval(() => {
                if (navigator.onLine) {
                    getUserLocation();
                }
            }, 30000); // Retry every 30 seconds
        }
    }
}

// Function to load and display cached data
function loadCachedData() {
    const cachedData = localStorage.getItem('prayerTimesCache');
    if (cachedData) {
        const { timings, timestamp } = JSON.parse(cachedData);
        if (!isCacheExpired(timestamp)) {
            displayPrayerTimes(timings);
            setInterval(() => displayPrayerTimes(timings), 1000);
        } else {
            displayNoSalahCard();
        }
    } else {
        displayNoSalahCard();
    }
}

// Function to get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchPrayerTimesByCoords(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                console.log('Unable to access location. Using default location (Makkah).');
                fetchPrayerTimesByCoords(21.3891, 39.8579);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser. Using default location (Makkah).');
        fetchPrayerTimesByCoords(21.3891, 39.8579);
    }
}

// Listen for network status changes
window.addEventListener('online', () => {
    console.log('Network is online, fetching new prayer times');
    getUserLocation();
});

window.addEventListener('offline', () => {
    console.log('Network is offline, using cached data');
    loadCachedData();
});

// On page load, try to fetch new data if online, otherwise load cached data
if (navigator.onLine) {
    getUserLocation();
} else {
    loadCachedData();
}