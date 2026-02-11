import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const [editDescription, setEditDescription] = useState(task.description || '');

    const toggleComplete = () => {
        router.patch(`/tasks/${task.id}`, {
            is_completed: !task.is_completed
        }, { preserveScroll: true });
    };

    const deleteTask = () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            router.delete(`/tasks/${task.id}`, { preserveScroll: true });
        }
    };

    const updateTask = (e) => {
        e.preventDefault();
        router.patch(`/tasks/${task.id}`, {
            title: editTitle,
            description: editDescription
        }, {
            onSuccess: () => setIsEditing(false),
            preserveScroll: true
        });
    };

    const priorityColors = {
        baja: 'bg-blue-100 text-blue-700',
        media: 'bg-amber-100 text-amber-700',
        alta: 'bg-red-100 text-red-700'
    };

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
            <div className="flex items-center gap-4 flex-1">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={toggleComplete}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                
                {isEditing ? (
                    <form onSubmit={updateTask} className="flex-1 flex flex-col gap-2">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 rounded-lg text-sm font-medium"
                            placeholder="Título de la tarea"
                            autoFocus
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full p-2 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 rounded-lg text-xs"
                            placeholder="Descripción (opcional)"
                            rows="2"
                        ></textarea>
                        <div className="flex justify-end gap-2 mt-1">
                            <button type="submit" className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Guardar
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col flex-1">
                        <span className={`text-slate-700 font-medium ${task.is_completed ? 'line-through text-slate-400' : ''}`}>
                            {task.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${priorityColors[task.prioridad] || priorityColors.baja}`}>
                                {task.prioridad}
                            </span>
                            {task.description && (
                                <span className="text-xs text-slate-400 truncate max-w-[200px]">
                                    {task.description}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 ml-4">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                )}
                <button
                    onClick={deleteTask}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </li>
    );
}
