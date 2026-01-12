export default function Index({ tareasIniciales }) {
    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-indigo-600 mb-6">
                    Listado de tareas
                </h1>

                {tareasIniciales.length === 0 ? (
                    <p className="text-slate-500">No hay tareas todavía.</p>
                ) : (
                    <ul className="space-y-3">
                        {tareasIniciales.map((tarea) => (
                            <li
                                key={tarea.id}
                                className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border"
                            >
                                <span className="font-medium text-slate-700">
                                    {tarea.titulo}
                                </span>
                                <span className="text-xs text-slate-400">#{tarea.id}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
