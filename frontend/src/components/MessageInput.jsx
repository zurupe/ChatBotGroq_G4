import { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [pregunta, setPregunta] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const texto = pregunta.trim();

    if (!texto) return;

    onSend(texto);
    setPregunta("");
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe tu pregunta..."
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled || !pregunta.trim()}>
        {disabled ? "Consultando..." : "Enviar"}
      </button>
    </form>
  );
}