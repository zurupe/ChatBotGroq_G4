import { useState } from "react";
import { enviarPregunta } from "../services/api";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatBox() {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const agregarMensaje = (role, content) => {
    const nuevoMensaje = {
      id: crypto.randomUUID(),
      role,
      content,
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);
  };

  const handleEnviarPregunta = async (pregunta) => {
    try {
      setError("");
      setCargando(true);

      agregarMensaje("user", pregunta);

      const data = await enviarPregunta(pregunta);

      agregarMensaje("bot", data.respuesta || "No se recibió respuesta.");
    } catch (err) {
      setError(err.message);
      agregarMensaje(
        "bot",
        "Ocurrió un error al consultar la IA. Verifica que el backend esté ejecutándose y que ya hayas ingresado documentos."
      );
    } finally {
      setCargando(false);
    }
  };

  const limpiarChat = () => {
    setMensajes([]);
    setError("");
  };

  return (
    <section className="card chat-card">
      <div className="chat-header">
        <div>
          <h2>Chat con IA</h2>
          <p className="section-description">
            Realiza preguntas sobre los documentos ingresados.
          </p>
        </div>

        <button className="secondary-button" onClick={limpiarChat}>
          Limpiar
        </button>
      </div>

      <MessageList mensajes={mensajes} />

      {error && <p className="error-message">{error}</p>}

      <MessageInput onSend={handleEnviarPregunta} disabled={cargando} />
    </section>
  );
}