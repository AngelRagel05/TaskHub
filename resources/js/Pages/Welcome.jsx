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
    const [ocultarLaravel, setOcultarLaravel] = useState(false);

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

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
            {/* 2. Mostramos variables simples usando { } */}
            <h1 className="text-4xl font-black text-indigo-600 uppercase">
                TaskHub de {nombreUsuario}
            </h1>

            <p className="text-slate-500 mt-2 font-medium">
                Hoy es: {fechaActual}
            </p>

            {/* 3. Listado dinámico (aquí es donde React brilla) */}
            <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-slate-800">
                    Tareas de hoy:
                </h2>

                <p>Tienes {tareasPendientes.length} tareas pendientes:</p>

                <ul className="space-y-3">
                    {tareasPendientes
                        .filter((tarea) =>
                            ocultarLaravel
                                ? !tarea.toLocaleLowerCase().includes("laravel")
                                : true
                        )
                        .map((tarea, index) => (
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
