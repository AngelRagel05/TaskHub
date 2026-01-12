import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-black text-indigo-600 mb-6">
                TaskHub Practice
            </h1>

            <div className="flex gap-4">
                <Link
                    href="/crear-tarea"
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
                >
                    Crear Tarea
                </Link>
                <Link
                    href="/tasks"
                    className="bg-white text-indigo-500 border border-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                    Ver Listado
                </Link>
            </div>
        </div>
    );
}
