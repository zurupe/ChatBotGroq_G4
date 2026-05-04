import { useRef, useState } from "react";
import { subirArchivo } from "../services/api";

const extensionesPermitidas = [".pdf", ".docx", ".xlsx", ".xls", ".txt"];

export default function FileUpload() {
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const inputRef = useRef(null);

  const validarArchivo = (file) => {
    const nombre = file.name.toLowerCase();
    return extensionesPermitidas.some((ext) => nombre.endsWith(ext));
  };

  const handleSeleccionArchivo = (event) => {
    const file = event.target.files[0];

    setEstado("");
    setError("");

    if (!file) return;

    if (!validarArchivo(file)) {
      setArchivo(null);
      setError("Formato no permitido. Usa PDF, Word, Excel o TXT.");
      return;
    }

    setArchivo(file);
  };

  const handleSubirArchivo = async () => {
    if (!archivo) {
      setError("Selecciona un archivo antes de subir.");
      return;
    }

    try {
      setCargando(true);
      setError("");
      setEstado("Procesando archivo...");

      const resultado = await subirArchivo(archivo);

      setEstado(`Archivo "${resultado.filename}" procesado correctamente.`);
      setArchivo(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      setError(err.message);
      setEstado("");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card upload-card">
      <h2>Ingesta de conocimiento</h2>
      <p className="section-description">
        Sube documentos para que el chatbot pueda responder con base en esa información.
      </p>

      <div className="file-box">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.xlsx,.xls,.txt"
          onChange={handleSeleccionArchivo}
          disabled={cargando}
        />

        {archivo && (
          <div className="selected-file">
            <strong>Archivo seleccionado:</strong>
            <span>{archivo.name}</span>
          </div>
        )}
      </div>

      <button
        className="primary-button"
        onClick={handleSubirArchivo}
        disabled={cargando}
      >
        {cargando ? "Procesando..." : "Subir e ingestar"}
      </button>

      {estado && <p className="success-message">{estado}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="allowed-files">
        Formatos permitidos: PDF, Word, Excel y TXT.
      </div>
    </section>
  );
}