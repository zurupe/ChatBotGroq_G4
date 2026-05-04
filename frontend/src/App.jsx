import "./App.css";
import BackendStatus from "./components/BackendStatus";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";

export default function App() {
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

        <BackendStatus />
      </header>

      <section className="main-grid">
        <FileUpload />
        <ChatBox />
      </section>
    </main>
  );
}