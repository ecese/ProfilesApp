Ece Şevval Mulhan 
210408025
------------------------------
Project Overview
This project is a React Native (Expo) application that displays a paginated list of user profiles and allows navigation to a detailed profile screen.
Implemented features:
Infinite scroll (pagination)
Pull-to-refresh
Screen-based data fetching
Error handling (404, network, server errors)
Environment variable configuration
----------------------------
Setup Instructions
1. Clone the repository
git clone 
cd ProfilesApp
2. Install dependencies
npm install
---------------------------
Environment Variables
Create a .env file in the project root directory:
EXPO_PUBLIC_API_BASE_URL=192.168.1.136:3000
Important notes:
Do NOT use localhost
Use your local network IP address
Restart Expo after changing .env
Example:
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.136:3000
-------------------------------
How to Run the Server
Start the backend server:
node server.js
or if using nodemon:
nodemon server.js
The server should be reachable at:
http://192.168.1.136:3000
You can test it in the browser:
http://192.168.1.136:3000/profiles
-----------------------------
How to Run the App
Start the Expo development server:
npx expo start
Then:
Scan the QR code using Expo Go (real device), or
Press i to open the iOS simulator, or
Press a to open the Android emulator
-----------------------------
IP Configuration
Mobile devices cannot access localhost
Backend and mobile device must be on the same Wi-Fi network
Always use your local IP address in the .env file
-----------------------------
Features Implemented
Profile list using FlatList
Infinite scroll with hasMore control
Pull-to-refresh support
Independent API call in ProfileDetailScreen
Request cancellation using AbortController
Proper UX-focused error handling
----------------------------
Notes
This project follows best practices for:
Screen independence
Safe pagination
Clean state management
User-friendly error handling
---------------------------
