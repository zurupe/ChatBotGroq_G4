import { useEffect, useState } from "react";
import { verificarBackend } from "../services/api";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    verificarBackend()
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);

  return (
    <div className={`backend-status ${status}`}>
      {status === "checking" && "Verificando backend..."}
      {status === "online" && "Backend conectado"}
      {status === "offline" && "Backend desconectado"}
    </div>
  );
}