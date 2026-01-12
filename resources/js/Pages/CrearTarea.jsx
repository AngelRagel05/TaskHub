import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function CrearTarea() {
    const [titulo, setTitulo] = useState('');

    const crearTarea = (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;

        router.post('/crear-tarea', { titulo }); // ← Aquí el cambio
        setTitulo('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">
                Crear nueva tarea
            </h1>

            <form onSubmit={crearTarea} className="flex flex-col gap-4 w-96">
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título de la tarea"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    Guardar Tarea
                </button>
            </form>

            <Link href="/" className="mt-4 text-indigo-500 hover:underline">
                Volver al inicio
            </Link>
        </div>
    );
}
