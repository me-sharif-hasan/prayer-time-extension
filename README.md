SalahTime - Islamic Prayer Times Chrome Extension
Welcome to SalahTime, a beautifully crafted Chrome extension that brings the serenity and discipline of Islamic prayer times to your browser's new tab page. Designed with a modern, holy, and motivating aesthetic, SalahTime transforms your Chrome homepage into a sacred space, reminding you of your daily prayers with elegance and precision.

✨ Features

Real-Time Prayer Times: Fetches accurate prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) based on your GPS location using the Aladhan API.
Upcoming Salah Highlight: The next prayer is prominently highlighted with a glowing golden gradient and a real-time countdown (hours, minutes, seconds).
Elegant Analog Clock: Displays the current time with a 3D-effect clock, featuring a sun/moon icon that moves along an oval path to reflect day or night.
Islamic Aesthetic: 
Stunning design with a dark starry background, wave patterns, and intricate Islamic star motifs.
Golden color scheme (#e6c992) with metallic gradients for a luxurious, sacred feel.
Custom typography using Al-Fitrah Ramadhan for date and countdown, and clean Roboto for prayer names and times.


Salah-Specific Icons: Each prayer is adorned with a minimalist SVG icon (e.g., crescent moon for Fajr, sun for Sunrise) to enhance visual appeal.
Responsive Design: Optimized for various screen sizes, ensuring a seamless experience on desktops, tablets, and mobile devices.
No Layout Shifts: Stable, performance-optimized layout with smooth animations for a distraction-free experience.
Dynamic Date Display: Shows the current date in a long format (e.g., "Thursday, April 17, 2025") for easy reference.
Open Source: Fully customizable codebase, welcoming contributions from the community.

🕌 Why SalahTime?
SalahTime is more than just a prayer times tool—it's a spiritual companion that integrates seamlessly into your daily browsing. Whether you're starting your day with Fajr or winding down with Isha, this extension keeps you connected to your faith with a visually immersive and motivating interface. Perfect for Muslims seeking a blend of functionality and beauty in their Chrome experience.
🚀 Installation
Follow these simple steps to install SalahTime as a Chrome extension:
Prerequisites

Google Chrome browser (latest version recommended).
A GitHub account to clone or download the repository.

Steps

Clone or Download the Repository:

Clone the repository using Git:git clone git@github.com:me-sharif-hasan/prayer-time-extension.git


Or download the ZIP file from the GitHub repository and extract it to a folder.


Enable Developer Mode in Chrome:

Open Chrome and navigate to chrome://extensions/.
In the top-right corner, toggle the Developer mode switch to ON.


Load the Extension:

Click the Load unpacked button on the Extensions page.
Browse to the folder where you cloned or extracted the repository (e.g., salahtime/).
Select the folder and click Open.
The SalahTime extension should now appear in your Extensions list.


Set as New Tab Page:

Open a new tab to see SalahTime in action. If it doesn't replace the default new tab page, you may need to:
Go to chrome://settings/newTab and ensure SalahTime is set as the new tab page (or use a Chrome extension like "New Tab Redirect" to set it manually).


Grant location permissions when prompted to enable GPS-based prayer times.


Enjoy!:

Your new tab page is now a sacred space, displaying prayer times tailored to your location with a stunning Islamic design.



📂 Project Structure
salahtime/
├── index.html         # Main HTML file for the new tab page
├── screenshots/       # Screenshots for README (add your own)
├── manifest.json      # Chrome extension manifest file
└── README.md          # This file

manifest.json Example
To make the extension work as a new tab page, ensure your manifest.json includes the following (create this file in the root directory if not already present):
{
  "manifest_version": 3,
  "name": "SalahTime",
  "version": "1.0.0",
  "description": "A Chrome extension displaying Islamic prayer times with a modern, holy aesthetic.",
  "permissions": ["geolocation"],
  "chrome_url_overrides": {
    "newTab": "index.html"
  },
  "icons": {
    "128": "icon128.png"
  }
}


Note: Add an icon128.png (128x128 pixels) to the root directory for the extension icon. You can create one using design tools or use a placeholder Islamic-themed icon.

🛠️ Customization
Want to personalize SalahTime? Here are some ideas:

Change Colors: Modify the golden color scheme in index.html (e.g., replace #e6c992 with your preferred hue).
Adjust Fonts: Swap Roboto or Al-Fitrah Ramadhan with other fonts by updating the <link> tags and CSS.
Add Features: Integrate additional Islamic tools like Qibla direction or Quran verses by extending the JavaScript.
Contribute: Fork the repository, make improvements, and submit a pull request!

🌟 Contributing
We welcome contributions to make SalahTime even better! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (`

