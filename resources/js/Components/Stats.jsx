import React from "react";

export default function Stats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.is_completed).length;
    const pending = total - completed;

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-3xl mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                <span className="text-slate-500 text-sm font-medium">Total</span>
                <span className="text-2xl font-bold text-indigo-600">{total}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                <span className="text-slate-500 text-sm font-medium">Completadas</span>
                <span className="text-2xl font-bold text-green-600">{completed}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                <span className="text-slate-500 text-sm font-medium">Pendientes</span>
                <span className="text-2xl font-bold text-amber-600">{pending}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                <span className="text-slate-500 text-sm font-medium">Progreso</span>
                <span className="text-2xl font-bold text-indigo-500">{percentage}%</span>
            </div>
        </div>
    );
}
