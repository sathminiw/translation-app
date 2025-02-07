Language Translator App

📌 Project Overview

This is a Language Translator App that allows users to input text, translate it into different languages using the Google Translate API, and display the translated result. The app supports right-to-left (RTL) languages and includes a dark mode option for better readability.

✨ Features

🌍 Multi-language Support: Users can select both Source and Target languages.

🔄 Swap Languages: Easily switch between source and target languages.

📝 Real-time Translation: Translates input text using the Google Translate API.

🎤 Speech-to-Text: Voice input is supported for entering text.

🌙 Dark Mode: Toggle between light and dark themes.

🕘 Translation History: Saves past translations for easy reference.

🛠 Error Handling: Handles invalid input and API failures gracefully.

🛠 Technologies Used

Frontend: React.js, Tailwind CSS

Backend: Google Translate API

State Management: React Hooks (useState, useEffect)

Speech Recognition: Web Speech API

🚀 Installation & Setup

Clone the repository

git clone https://github.com/sathminiw/translation-app.git
cd translation-app

Install dependencies

npm install

Set up environment variables

Create a .env file in the project root and add your API key:

VITE_API_KEY=your_google_translate_api_key

Start the development server

npm run dev

Open the app in your browser at http://localhost:5173/.

📝 Usage

Select a Source Language and a Target Language.

Enter text in the input box or use the 🎤 Microphone button for speech-to-text.

Click the Translate button to get the translated text.

Swap languages using the 🔄 button.

View past translations in the History section.
