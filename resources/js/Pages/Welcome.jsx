import { useState } from "react";

export default function Welcome() {
    // 1. Definimos variables (lógica de JavaScript)
    const nombreUsuario = "Ángel";
    const tareasPendientes = [
        "Instalar Laravel",
        "Configurar React",
        "Aprender Tailwind",
        "Desplegar en producción",
    ];
    const fechaActual = new Date().toLocaleDateString();
    const mensaje = "¡Ánimo, hoy es un gran día para programar!";

    const [ocultarLaravel, setOcultarLaravel] = useState(false);
    const [filtro, setFiltro] = useState("");

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

    const tareasFiltradas = tareasPendientes.filter((tarea) => {
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

            {/* 4. Filtro de tareas */}
            <div className="mt-6 w-full max-w-md">
                <input
                    type = "text"
                    placeholder="Filtra tus tareas..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* 5. Listado dinámico (aquí es donde React brilla) */}
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
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
                    Nueva Tarea
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
