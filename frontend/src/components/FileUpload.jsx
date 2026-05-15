import { useRef, useState } from "react";
import { subirArchivo } from "../services/api";

const extensionesPermitidas = [
  ".pdf",
  ".docx",
  ".xlsx",
  ".xls",
  ".txt",
];

export default function FileUpload() {
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const validarArchivo = (file) => {
    const nombre = file.name.toLowerCase();

    return extensionesPermitidas.some((ext) =>
      nombre.endsWith(ext)
    );
  };

  const seleccionarArchivo = (file) => {
    setEstado("");
    setError("");

    if (!file) return;

    if (!validarArchivo(file)) {
      setArchivo(null);

      setError(
        "Formato no permitido. Usa PDF, Word, Excel o TXT."
      );

      return;
    }

    setArchivo(file);
  };

  const handleSeleccionArchivo = (e) => {
    const file = e.target.files[0];

    seleccionarArchivo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files &&
        e.dataTransfer.files.length > 0) {

      const file = e.dataTransfer.files[0];

      seleccionarArchivo(file);

      e.dataTransfer.clearData();
    }
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

      setEstado(
        `Archivo "${resultado.filename}" procesado correctamente.`
      );

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
        Sube documentos para que el chatbot
        responda usando esa información.
      </p>

      <div
        className={`drop-zone ${dragging ? "dragging" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          📂
        </div>

        <p>Arrastra documentos aquí</p>

        <span>
          o haz clic para seleccionar archivos
        </span>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.docx,.xlsx,.xls,.txt"
          onChange={handleSeleccionArchivo}
          disabled={cargando}
        />
      </div>

      {archivo && (
        <div className="selected-file">
          <strong>Archivo seleccionado</strong>

          <span>{archivo.name}</span>
        </div>
      )}

      <button
        className="primary-button upload-button"
        onClick={handleSubirArchivo}
        disabled={cargando}
      >
        {cargando
          ? "Procesando..."
          : "Subir documento"}
      </button>

      {estado && (
        <p className="success-message">
          {estado}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div className="allowed-files">
        PDF • Word • Excel • TXT
      </div>
    </section>
  );
}