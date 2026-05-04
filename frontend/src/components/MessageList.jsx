export default function MessageList({ mensajes }) {
  return (
    <div className="messages-container">
      {mensajes.length === 0 ? (
        <div className="empty-chat">
          <h3>Hola, soy tu asistente de conocimiento.</h3>
          <p>Sube un documento y luego hazme preguntas sobre su contenido.</p>
        </div>
      ) : (
        mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`message ${mensaje.role === "user" ? "user" : "bot"}`}
          >
            <div className="message-label">
              {mensaje.role === "user" ? "Tú" : "IA"}
            </div>
            <div className="message-content">{mensaje.content}</div>
          </div>
        ))
      )}
    </div>
  );
}