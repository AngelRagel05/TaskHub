import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Stats from '@/Components/Stats';
import TaskItem from '@/Components/TaskItem';

export default function Welcome({ tasks = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        prioridad: 'baja'
    });

    const submit = (e) => {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <Head title="TaskHub - Mis Tareas" />
            
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-2">
                        Task<span className="text-indigo-600">Hub</span>
                    </h1>
                    <p className="text-lg text-slate-600">Gestiona tus tareas de forma eficiente y sencilla.</p>
                </header>

                {/* Stats Section */}
                <Stats tasks={tasks} />

                {/* Create Task Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Nueva Tarea
                    </h2>
                    
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${errors.title ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="¿Qué hay que hacer?"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad</label>
                                <select
                                    value={data.prioridad}
                                    onChange={e => setData('prioridad', e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                >
                                    <option value="baja">Baja</option>
                                    <option value="media">Media</option>
                                    <option value="alta">Alta</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (Opcional)</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                rows="2"
                                placeholder="Añade algún detalle adicional..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 transition-all shadow-sm shadow-indigo-100"
                            >
                                {processing ? 'Guardando...' : 'Añadir Tarea'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-slate-800">Tus Tareas</h2>
                        <span className="text-sm text-slate-500">{tasks.length} tareas en total</span>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No hay tareas pendientes. ¡Buen trabajo!</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {tasks.map(task => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}