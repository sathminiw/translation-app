import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "./components/LanguageSelector";
import TextArea from "./components/TextArea";
import TranslateButton from "./components/TranslateButton";
import { FaExchangeAlt, FaMicrophone, FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("translationHistory") ?? "[]"
      );
      setHistory(savedHistory);
    } catch {
      setHistory([]);
    }
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setError("");
    setTranslatedText("Translating...");
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          q: inputText,
          source: sourceLanguage === "auto" ? undefined : sourceLanguage,
          target: targetLanguage,
          format: "text",
        }
      );
      const translated = response.data.data.translations[0].translatedText;
      setTranslatedText(translated);

      const newHistory = [
        { inputText, translated, sourceLanguage, targetLanguage },
        ...history,
      ];
      setHistory(newHistory);
      localStorage.setItem("translationHistory", JSON.stringify(newHistory));
    } catch {
      setError("Failed to translate. Please check your API key.");
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    if (translatedText) {
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage;
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
    };
  };

  return (
    <div
      className={`
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}
        min-h-screen flex flex-col transition-colors duration-300
      `}
    >
      <header className="relative py-10 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30
            text-white rounded-lg transition-all duration-300
          "
        >
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Language Translator
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-10">
        <div
          className={`w-full max-w-4xl p-10 rounded-xl shadow-2xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } transition-colors duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
              label="Source Language"
            />
            <button
              className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md text-xl transition-all duration-300"
              onClick={swapLanguages}
            >
              <FaExchangeAlt size={28} />
            </button>
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              label="Target Language"
            />
          </div>
          <div className="grid gap-6 mb-6">
            <div className="relative">
              <TextArea
                value={inputText}
                onChange={setInputText}
                isInput={true}
                label="Enter Text"
              />
              <button
                className="absolute bottom-3 right-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300"
                onClick={startSpeechRecognition}
              >
                <FaMicrophone size={24} />
              </button>
            </div>
            <TextArea value={translatedText} label="Translated Text" />
          </div>
          <TranslateButton
            onClick={handleTranslate}
            isLoading={translatedText === "Translating..."}
          />
          {error && (
            <p className="text-red-500 text-center mt-4 text-lg">{error}</p>
          )}
        </div>
      </main>

      <footer
        className={`
          text-center py-4 text-sm shadow-lg
          bg-gradient-to-r from-blue-400 to-purple-500
          ${darkMode ? "text-white" : "text-white"}
        `}
      >
        © 2025 Language Translator App
      </footer>
    </div>
  );
};

export default App;
