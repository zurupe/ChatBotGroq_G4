# Chatbot de Conocimiento con Groq, FastAPI y React

Proyecto académico para la asignatura **Aplicaciones Basadas en el Conocimiento**.

El sistema permite subir documentos para realizar una ingesta de conocimiento y luego consultar la información mediante un chatbot conectado a un modelo de IA usando **Groq**, **LlamaIndex** y **ChromaDB**.

---

## Integrantes

- Diana Guerra
- Simoné Medina
- Pablo Zurita

---

## Descripción general

Este proyecto está dividido en dos partes:

```txt
ChatBotGroq_G4/
│
├── backend/
│   ├── main.py
│   ├── services/
│   │   ├── chat.py
│   │   └── ingesta.py
│   ├── data/
│   ├── temp_uploads/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

### Backend

El backend está desarrollado con **FastAPI**. Sus funciones principales son:

- Recibir archivos cargados por el usuario.
- Procesar documentos mediante LlamaIndex.
- Guardar los vectores en ChromaDB.
- Consultar la información usando Groq como modelo de lenguaje.
- Exponer endpoints para el frontend.

### Frontend

El frontend está desarrollado con **React + Vite**. Sus funciones principales son:

- Mostrar una interfaz de chatbot.
- Permitir la subida de archivos.
- Consultar el estado del backend.
- Enviar preguntas al backend.
- Mostrar respuestas generadas por la IA.

---

## Tecnologías utilizadas

### Backend

- Python
- FastAPI
- Uvicorn
- LlamaIndex
- Groq
- ChromaDB
- HuggingFace Embeddings
- Python Dotenv

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

---

## Requisitos previos

Antes de ejecutar el proyecto, tener instalado:

- Python 3.12 o superior
- Node.js 18 o superior
- npm
- Git
- Cuenta en GroqCloud
- API Key de Groq

---

## Configuración del backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Crear entorno virtual:

```bash
python -m venv venv
```

Activar entorno virtual en Windows PowerShell:

```bash
.\venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install fastapi uvicorn llama-index llama-index-vector-stores-chroma chromadb python-multipart python-dotenv llama-index-llms-groq llama-index-embeddings-huggingface
```

---

## Variables de entorno del backend

Crear un archivo llamado `.env` dentro de la carpeta `backend`.

Contenido:

```env
GROQ_API_KEY=coloca_tu_api_key_aqui
```

---

## Ejecutar el backend

Desde la carpeta `backend`, ejecutar:

```bash
uvicorn main:app
```

El backend quedará disponible en:

```txt
http://localhost:8000
```

Documentación automática de FastAPI:

```txt
http://localhost:8000/docs
```

---

## Endpoints principales del backend

### Verificar estado del backend

```http
GET /
```

Respuesta esperada:

```json
{
  "status": "online",
  "message": "Backend de Chatbot listo"
}
```

---

### Ingestar documento

```http
POST /ingestar/
```

Recibe un archivo mediante `multipart/form-data`.

Campo requerido:

```txt
file
```

Respuesta esperada:

```json
{
  "filename": "documento.pdf",
  "status": "procesado",
  "info": "Procesados 1 documentos con éxito usando Groq."
}
```

---

### Consultar chatbot

```http
POST /chat/?pregunta=Texto de la pregunta
```

Respuesta esperada:

```json
{
  "pregunta": "¿De qué trata el documento?",
  "respuesta": "El documento trata sobre..."
}
```

---

## Configuración del frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env` dentro de `frontend`:

---

## Ejecutar el frontend

Desde la carpeta `frontend`, ejecutar:

```bash
npm run dev
```
---

## Flujo de uso

1. Ejecutar el backend.
2. Ejecutar el frontend.
3. Verificar que aparezca el estado `Backend conectado`.
4. Subir un archivo PDF, Word, Excel o TXT.
5. Esperar el mensaje de procesamiento correcto.
6. Escribir una pregunta en el chat.
7. Recibir la respuesta generada por la IA.

---

## Formatos de archivo permitidos

El frontend permite seleccionar principalmente:

- `.pdf`
- `.docx`
- `.xlsx`
- `.xls`
- `.txt`
