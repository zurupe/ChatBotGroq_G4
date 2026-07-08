const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function verificarBackend() {
  try {
    const response = await fetch(`${API_URL}/`);

    if (!response.ok) {
      throw new Error("No se pudo conectar con el backend");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Backend no disponible");
  }
}

export async function subirArchivo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/ingestar/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      "No se pudo procesar el archivo. Revisa el formato o intenta con otro documento."
    );
  }

  return data;
}

export async function enviarPregunta(pregunta) {
  const url = `${API_URL}/chat/?pregunta=${encodeURIComponent(pregunta)}`;

  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al consultar la IA");
  }

  return data;
}