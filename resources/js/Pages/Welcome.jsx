import { useState } from "react";

export default function Welcome() {
    // 1. Definimos variables (lógica de JavaScript)
    const nombreUsuario = "Ángel";

    const [tareas, setTareas] = useState([
        "Instalar Laravel",
        "Configurar React",
        "Aprender Tailwind",
        "Desplegar en producción",
    ]);

    // --- NUEVO: 1. Variable de estado contador inicializada en 0 ---
    const [contador, setContador] = useState(0);

    const fechaActual = new Date().toLocaleDateString();
    const mensaje = "¡Ánimo, hoy es un gran día para programar!";

    const [ocultarLaravel, setOcultarLaravel] = useState(false);
    const [filtro, setFiltro] = useState("");

    const añadirTarea = () => {
        // Opcional: Evitar que añada más si ya está llena (mejora de UX)
        if (contador >= 10) return; 

        const nuevaTarea = prompt("¿Cuál es la nueva tarea?");
        
        if (nuevaTarea) {
            setTareas([...tareas, nuevaTarea]);
            // --- NUEVO: 2. Incrementamos el contador al añadir tarea ---
            setContador(contador + 1);
        }
    };

    function colorFrase(texto) {
        return texto.toLowerCase().includes("laravel")
            ? "text-blue-500"
            : "text-red-500";
    }

    function tareasLargas(texto) {
        return texto.length > 20 ? "font-bold italic" : "";
    }

    function tareaEmoji(texto) {
        return texto.toLowerCase().includes("laravel")
            ? "🐘"
            : texto.toLowerCase().includes("react")
              ? "⚛️"
              : texto.toLowerCase().includes("tailwind")
                ? "🌬️"
                : texto.toLowerCase().includes("producción")
                  ? "🚀"
                  : "📝";
    }

    const tareasFiltradas = tareas.filter((tarea) => {
        const pasaFiltro = tarea.toLowerCase().includes(filtro.toLowerCase());
        const pasaLaravel = ocultarLaravel
            ? !tarea.toLowerCase().includes("laravel")
            : true;
        return pasaFiltro && pasaLaravel;
    });

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
            <p className="p-4">{mensaje}</p>
            {/* 2. Mostramos variables simples usando { } */}
            <h1 className="text-4xl font-black text-indigo-600 uppercase">
                TaskHub de {nombreUsuario}
            </h1>

            {/* 3. Fecha actual  */}
            <p className="text-slate-500 mt-2 font-medium">
                Hoy es: {fechaActual}
            </p>

            {/* Mostramos el contador (Opcional, para ver que funciona) */}
            <p className="text-sm text-slate-400 mt-1">
                Tareas añadidas en esta sesión: {contador}
            </p>

            {/* 4. Filtro de tareas */}
            <div className="mt-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Filtra tus tareas..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* 5. Listado dinámico */}
            <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-slate-800">
                    Tareas de hoy:
                </h2>

                <p>Tienes {tareasFiltradas.length} tareas pendientes:</p>

                <ul className="space-y-3">
                    {tareasFiltradas.map((tarea, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                        >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <p
                                className={`${colorFrase(
                                    tarea
                                )} ${tareasLargas(tarea)}`}
                            >
                                {tarea} {tareaEmoji(tarea)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 6. Botones de acción */}
            <div className="mt-10 flex gap-4">
                {/* --- NUEVO: 3. Condicional para color y texto --- */}
                <button
                    onClick={añadirTarea}
                    // Si contador es 10, desactivamos el botón (disabled) para que no se pulse
                    disabled={contador >= 10}
                    className={`px-6 py-2 rounded-lg text-white transition ${
                        contador >= 10
                            ? "bg-red-500 cursor-not-allowed" // Estilo rojo si está lleno
                            : "bg-indigo-500 hover:bg-indigo-600" // Estilo normal
                    }`}
                >
                    {/* Texto condicional: Si es >= 10 muestra "Lista Llena", si no "Añadir tarea" */}
                    {contador >= 10 ? "¡Lista Llena!" : "Añadir tarea"}
                </button>
            </div>

            <div className="mt-10 flex gap-4">
                <button
                    onClick={() => setOcultarLaravel(!ocultarLaravel)}
                    className={`px-6 py-2 rounded-lg transition ${
                        ocultarLaravel
                            ? "bg-gray-400 hover:bg-gray-500 text-white"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    }`}
                >
                    {ocultarLaravel
                        ? "Mostrar todas las tareas"
                        : "Ocultar tareas Laravel"}
                </button>
            </div>
        </div>
    );
}