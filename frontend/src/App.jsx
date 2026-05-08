import "./App.css";
import BackendStatus from "./components/BackendStatus";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";
import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

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

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Claro" : "Oscuro"}
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