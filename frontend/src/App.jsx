import "./App.css";
import BackendStatus from "./components/BackendStatus";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";
import { useState, useEffect } from "react";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v3" />
      <path d="M12 18.5v3" />
      <path d="m4.58 4.58 2.12 2.12" />
      <path d="m17.3 17.3 2.12 2.12" />
      <path d="M2.5 12h3" />
      <path d="M18.5 12h3" />
      <path d="m4.58 19.42 2.12-2.12" />
      <path d="m17.3 6.7 2.12-2.12" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.7 15.2A8.6 8.6 0 0 1 8.8 3.3 8.7 8.7 0 1 0 20.7 15.2Z" />
      <path d="M17.8 4.1h.01" />
      <path d="M20.2 7.2h.01" />
    </svg>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode((currentMode) => !currentMode);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Chatbot de Conocimiento</h1>
          <p>
            Sistema de ingesta documental y consulta inteligente usando FastAPI,
            LlamaIndex, ChromaDB y Groq.
          </p>
        </div>

        <button
          type="button"
          className={`theme-toggle ${darkMode ? "dark" : "light"}`}
          onClick={toggleTheme}
          aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          aria-pressed={darkMode}
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-icon theme-icon-sun">
              <SunIcon />
            </span>
            <span className="theme-icon theme-icon-moon">
              <MoonIcon />
            </span>
            <span className="theme-toggle-thumb">
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </span>
          </span>
        </button>

        <BackendStatus />
      </header>

      <section className="main-grid">
        <FileUpload />
        <ChatBox />
      </section>
    </main>
  );
}